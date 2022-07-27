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

const clients = {};

fastify.get("/stream", (request, reply) => {
  const id = Utils.getUniqueIdentifierStr();
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  reply.raw.writeHead(200, headers);
  reply.raw.write(`event: connect\ndata: ${id}\n\n`);

  clients[id] = reply;

  request.raw.on("close", () => {
    delete clients[id];
  });
});

fastify.post("/romanize", (request, reply) => {
  const roman = Utils.romanize(parseInt(request.body.integer, 10));

  clients[request.body.clientId].raw.write(`data: ${roman}\n\n`);

  return reply.send();
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);

    process.exit(1);
  }

  fastify.log.info(`Server listening on ${address}`);
});
