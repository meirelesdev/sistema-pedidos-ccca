"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ZipcodeCalculatorAPIMemory_1 = __importDefault(require("./ZipcodeCalculatorAPIMemory"));
test("Deve calcular a distância entre dois ceps", function () {
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    const distance = zipcodeCalculator.calculate("11.111-111", "99.999-999");
});
