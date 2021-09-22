"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderInput {
    constructor({ cpf, items, coupon }) {
        this.cpf = cpf;
        this.items = items;
        this.coupon = coupon;
    }
}
exports.default = PlaceOrderInput;
