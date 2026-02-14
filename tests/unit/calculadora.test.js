const calculadora = require("../../models/calculadora");

test("calculadora somar 2+3 retornar 5", () => {
  expect(calculadora.somar(2, 3)).toBe(5);
});

test("calculadora somar 4+3 retornar 7", () => {
  expect(calculadora.somar(4, 3)).toBe(7);
});
