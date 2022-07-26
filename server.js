const path = require("path");
const fastify = require("fastify")({
  logger: false,
});
const Utils = require("./src/utils.js");

fastify.register(require("@fastify/cors"), () => (req, callback) => {
  const corsOptions = {
    origin: true,
  };

  if (/^localhost$/m.test(req.headers.origin)) {
    corsOptions.origin = false;
  }

  callback(null, corsOptions);
});

fastify.register(require("@fastify/formbody"));

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

fastify.post("/romanize", (request, reply) =>
  reply.send({
    roman: Utils.romanize(parseInt(request.body.integer, 10)),
  })
);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);

    process.exit(1);
  }

  fastify.log.info(`Server listening on ${address}`);
});
