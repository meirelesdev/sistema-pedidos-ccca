"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
const Item_1 = __importDefault(require("./Item"));
const Order_1 = __importDefault(require("./Order"));
const PlaceOrderOutput_1 = __importDefault(require("./PlaceOrderOutput"));
class PlaceOrder {
    constructor() {
        this.coupons = [
            new Coupon_1.default("VALE20", 20, new Date("2021-10-10")),
            new Coupon_1.default("VALE20_EXPIRED", 20, new Date("2020-10-10"))
        ];
        this.items = [
            new Item_1.default("1", "Guitarra", 1000, 100, 50, 15, 3),
            new Item_1.default("2", "Amplificador", 5000, 50, 50, 50, 22),
            new Item_1.default("3", "Cabo", 30, 10, 10, 10, 1)
        ];
        this.orders = [];
    }
    execute(input) {
        const order = new Order_1.default(input.cpf);
        for (const orderItem of input.items) {
            const item = this.items.find(item => item.id === orderItem.id);
            if (!item)
                throw new Error("Item not found");
            order.addItem(orderItem.id, item.price, orderItem.quantity);
        }
        if (input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.code === input.coupon);
            if (coupon)
                order.addCoupon(coupon);
        }
        const total = order.getTotal();
        this.orders.push(order);
        return new PlaceOrderOutput_1.default({
            total
        });
    }
}
exports.default = PlaceOrder;
