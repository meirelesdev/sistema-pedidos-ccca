"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FreightCalculator {
    static calculate(distance, item) {
        return distance * item.getVolume() * (item.getDensity() / 100);
    }
}
exports.default = FreightCalculator;
