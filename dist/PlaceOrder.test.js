"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = __importDefault(require("./PlaceOrder"));
test("Deve fazer um pedido", function () {
    const input = {
        cpf: "987.599.380-80",
        items: [
            { description: "Guitarra", price: 1000, quantity: 2 },
            { description: "Amplificador", price: 5000, quantity: 1 },
            { description: "Cabo", price: 30, quantity: 3 }
        ],
        coupon: "VALE20"
    };
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
});
