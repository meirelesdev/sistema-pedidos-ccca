"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FreightCalculator_1 = __importDefault(require("./FreightCalculator"));
const Order_1 = __importDefault(require("./Order"));
const PlaceOrderOutput_1 = __importDefault(require("./PlaceOrderOutput"));
class PlaceOrder {
    constructor(itemRepository, couponRepository, orderRepository, zipcodeCalculator) {
        this.itemRepository = itemRepository;
        this.coupomRepository = couponRepository;
        this.orderRepository = orderRepository;
        this.zipcodeCalculator = zipcodeCalculator;
    }
    execute(input) {
        const order = new Order_1.default(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-999");
        for (const orderItem of input.items) {
            const item = this.itemRepository.getById(orderItem.id);
            if (!item)
                throw new Error("Item not found");
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator_1.default.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.coupomRepository.getByCode(input.coupon);
            if (coupon)
                order.addCoupon(coupon);
        }
        this.orderRepository.save(order);
        return new PlaceOrderOutput_1.default({
            freight: order.freight,
            total: order.getTotal()
        });
    }
}
exports.default = PlaceOrder;
