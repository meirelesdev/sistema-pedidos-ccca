
import PlaceOrderInput from "../../src/application/DTOs/PlaceOrderInput"
import GetOrder from "../../src/application/usecases/GetOrder"
import PlaceOrder from "../../src/application/usecases/PlaceOrder"
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory"
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory.ts"
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory"

let repositoryFactory: RepositoryFactory
let zipcodeCalculator: ZipcodeCalculatorAPI
beforeEach(async function () {
    repositoryFactory = new DatabaseRepositoryFactory()
    const orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clean()
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
})
test("Deve consultar um pedido", async function () {
    const input = new PlaceOrderInput({
        cpf: "987.599.380-80",
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        coupon: "VALE20"
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    const getOrder = new GetOrder(repositoryFactory)
    const getOrderOutput = await getOrder.execute(output.code)
    expect(getOrderOutput.total).toBe(5982)
})