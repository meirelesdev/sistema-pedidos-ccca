"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderInput {
    constructor({ cpf, zipcode, items, coupon }) {
        this.cpf = cpf;
        this.items = items;
        this.coupon = coupon;
        this.zipcode = zipcode;
    }
}
exports.default = PlaceOrderInput;
