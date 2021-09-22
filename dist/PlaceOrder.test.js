"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = __importDefault(require("./PlaceOrder"));
const PlaceOrderInput_1 = __importDefault(require("./PlaceOrderInput"));
test("Deve fazer um pedido", function () {
    const input = new PlaceOrderInput_1.default({
        cpf: "987.599.380-80",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20"
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
});
test("Deve fazer um pedido com cupom de desconto expirado", function () {
    const input = new PlaceOrderInput_1.default({
        cpf: "987.599.380-80",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20_EXPIRED"
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7090);
});
