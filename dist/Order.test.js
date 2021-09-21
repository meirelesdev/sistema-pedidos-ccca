"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
const Order_1 = __importDefault(require("./Order"));
test("Não deve criar um pedido com CPF inválido", function () {
    const cpf = "111.111.111-11";
    expect(() => new Order_1.default(cpf)).toThrow(new Error("Invalid CPF"));
});
test("Deve criar um pedido com 3 itens", function () {
    const cpf = "987.599.380-80";
    const order = new Order_1.default(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    const total = order.getTotal();
    expect(total).toBe(7090);
});
test("Deve criar um pedido com cupom de desconto", function () {
    const cpf = "987.599.380-80";
    const order = new Order_1.default(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    order.addCoupon(new Coupon_1.default("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(5672);
});
