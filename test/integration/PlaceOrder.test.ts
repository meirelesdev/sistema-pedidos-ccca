import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory"
import PlaceOrder from "../../src/application/usecases/PlaceOrder"
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory"
import PlaceOrderInput from "../../src/application/DTOs/PlaceOrderInput"
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory"


test("Deve fazer um pedido", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {id:"1", quantity: 2},
            {id:"2", quantity: 1},
            {id:"3", quantity: 3}
        ],
        coupon: "VALE20"
    })
    const repositoryFactory = new MemoryRepositoryFactory()
    // const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance())
    const orderRepository = OrderRepositoryMemory.getInstance()
    await orderRepository.clean()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5982)
})
test("Deve fazer um pedido com cupom de desconto expirado", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {id:"1", quantity: 2},
            {id:"2", quantity: 1},
            {id:"3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    })
    const repositoryFactory = new MemoryRepositoryFactory()
    // const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance())
    const orderRepository = OrderRepositoryMemory.getInstance()
    await orderRepository.clean()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(7400)
})
test("Deve fazer um pedido com calculo de frete", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {id:"1", quantity: 2},
            {id:"2", quantity: 1},
            {id:"3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    })
    const repositoryFactory = new MemoryRepositoryFactory()
    // const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance())
    const orderRepository = OrderRepositoryMemory.getInstance()
    await orderRepository.clean()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.freight).toBe(310)
})
test("Deve fazer um pedido calculando o código ", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {id:"1", quantity: 2},
            {id:"2", quantity: 1},
            {id:"3", quantity: 3}
        ],
        issueDate: new Date("2020-10-10"),
        coupon: "VALE20_EXPIRED"
    })
    const repositoryFactory = new MemoryRepositoryFactory()
    // const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance())
    const orderRepository = OrderRepositoryMemory.getInstance()
    await orderRepository.clean()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.code).toBe("202000000001")
})