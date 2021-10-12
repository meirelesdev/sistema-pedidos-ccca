import FreightCalculator from "../../domain/service/FreightCalculator"
import ItemRepository from "../../domain/repository/ItemRepository"
import Order from "../../domain/entity/Order"
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI"
import ZipcodeCalculatorAPIMemory from "../../infra/gateway/memory/ZipcodeCalculatorAPIMemory"
import PlaceOrderInput from "../DTOs/PlaceOrderInput"
import PlaceOrderOutput from "../DTOs/PlaceOrderOutput"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import OrderCreator from "../../domain/service/OrderCreator"

export default class PlaceOrder {
    zipcodeCalculator: ZipcodeCalculatorAPIMemory
    repositoryFactory: RepositoryFactory
    
    constructor(repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.repositoryFactory = repositoryFactory
        this.zipcodeCalculator = zipcodeCalculator
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const orderService = new OrderCreator(this.repositoryFactory, this.zipcodeCalculator)
        const order = await orderService.create(input)
        return new PlaceOrderOutput({
                code: order.code.value,
                freight: order.freight,
                taxes: order.taxes,
                total: order.getTotal()
        })
    }
}