import FreightCalculator from "../../domain/service/FreightCalculator"
import ItemRepository from "../../domain/repository/ItemRepository"
import Order from "../../domain/entity/Order"
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI"
import OrderRepository from "../../domain/repository/OrderRepository"
import CouponRepository from "../../domain/repository/CouponRepository"
import ZipcodeCalculatorAPIMemory from "../../infra/gateway/memory/ZipcodeCalculatorAPIMemory"
import PlaceOrderInput from "../DTOs/PlaceOrderInput"
import PlaceOrderOutput from "../DTOs/PlaceOrderOutput"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"

export default class PlaceOrder {
    zipcodeCalculator: ZipcodeCalculatorAPIMemory
    itemRepository: ItemRepository
    coupomRepository: CouponRepository
    orderRepository: OrderRepository
    
    constructor(repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.itemRepository = repositoryFactory.createItemRepository()
        this.coupomRepository = repositoryFactory.createCouponRepository()
        this.orderRepository = repositoryFactory.createOrderRepository()
        this.zipcodeCalculator = zipcodeCalculator
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1
        const order = new Order(input.cpf, input.issueDate, sequence)
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-999");
        for(const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.id)
            if(!item) throw new Error("Item not found")
            order.addItem(orderItem.id, item.price, orderItem.quantity)
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity
        }
        if(input.coupon) {
            const coupon = await this.coupomRepository.getByCode(input.coupon)
            if(coupon) order.addCoupon(coupon)
        }
        await this.orderRepository.save(order)
        return new PlaceOrderOutput({
                code: order.code.value,
                freight: order.freight,
                total: order.getTotal()
        })
    }
}