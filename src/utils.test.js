const Utils = require("./utils.js");

test("Romanize 12", () => {
  expect(Utils.romanize(4)).toBe("IV");
});

test("Romanize 99", () => {
  expect(Utils.romanize(99)).toBe("XCIX");
});

test("Romanize 753", () => {
  expect(Utils.romanize(753)).toBe("DCCLIII");
});

test("Romanize 3999", () => {
  expect(Utils.romanize(3999)).toBe("MMMCMXCIX");
});

test("Romanize a negative integer", () => {
  expect(Utils.romanize(-1)).toBe("");
});

test("Romanize a float", () => {
  expect(() => {
    Utils.romanize(3.5);
  }).toThrowError();
});

test("Romanize below minimum value (1)", () => {
  expect(Utils.romanize(0)).toBe("");
});

test("Romanize above maximum value (3999)", () => {
  expect(Utils.romanize(4000)).toBe("");
});

test("Romanize an empty input", () => {
  expect(() => {
    Utils.romanize();
  }).toThrowError();
});

test("Romanize a string", () => {
  expect(() => {
    Utils.romanize("a");
  }).toThrowError();
});
