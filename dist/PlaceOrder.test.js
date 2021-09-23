"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CouponRepositoryMemory_1 = __importDefault(require("./CouponRepositoryMemory"));
const ItemRepositoryMemory_1 = __importDefault(require("./ItemRepositoryMemory"));
const OrderRepositoryMemory_1 = __importDefault(require("./OrderRepositoryMemory"));
const PlaceOrder_1 = __importDefault(require("./PlaceOrder"));
const PlaceOrderInput_1 = __importDefault(require("./PlaceOrderInput"));
const ZipcodeCalculatorAPIMemory_1 = __importDefault(require("./ZipcodeCalculatorAPIMemory"));
test("Deve fazer um pedido", function () {
    const input = new PlaceOrderInput_1.default({
        cpf: "987.599.380-80",
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20"
    });
    const itemRepository = new ItemRepositoryMemory_1.default();
    const couponRepository = new CouponRepositoryMemory_1.default();
    const orderRepository = new OrderRepositoryMemory_1.default();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    const placeOrder = new PlaceOrder_1.default(itemRepository, couponRepository, orderRepository, zipcodeCalculator);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5982);
});
test("Deve fazer um pedido com cupom de desconto expirado", function () {
    const input = new PlaceOrderInput_1.default({
        cpf: "987.599.380-80",
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20_EXPIRED"
    });
    const itemRepository = new ItemRepositoryMemory_1.default();
    const couponRepository = new CouponRepositoryMemory_1.default();
    const orderRepository = new OrderRepositoryMemory_1.default();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    const placeOrder = new PlaceOrder_1.default(itemRepository, couponRepository, orderRepository, zipcodeCalculator);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7400);
});
test("Deve fazer um pedido com calculo de frete", function () {
    const input = new PlaceOrderInput_1.default({
        cpf: "987.599.380-80",
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20_EXPIRED"
    });
    const itemRepository = new ItemRepositoryMemory_1.default();
    const couponRepository = new CouponRepositoryMemory_1.default();
    const orderRepository = new OrderRepositoryMemory_1.default();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    const placeOrder = new PlaceOrder_1.default(itemRepository, couponRepository, orderRepository, zipcodeCalculator);
    const output = placeOrder.execute(input);
    expect(output.freight).toBe(310);
});
