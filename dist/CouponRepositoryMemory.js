"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
class CouponRepositoryMemory {
    constructor() {
        this.coupons = [
            new Coupon_1.default("VALE20", 20, new Date("2021-10-10")),
            new Coupon_1.default("VALE20_EXPIRED", 20, new Date("2020-10-10"))
        ];
    }
    getByCode(code) {
        return this.coupons.find(coupon => coupon.code === code);
    }
}
exports.default = CouponRepositoryMemory;
