import PlaceOrder from "../../src/application/usecases/PlaceOrder"
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory"
import PlaceOrderInput from "../../src/application/DTOs/PlaceOrderInput"
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory"
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory.ts"

let repositoryFactory: RepositoryFactory
let zipcodeCalculator: ZipcodeCalculatorAPI

beforeEach(async function () {
    repositoryFactory = new DatabaseRepositoryFactory()
    const orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clean()
    const stockEntryRepository = repositoryFactory.createStockEntryRepository()
    await stockEntryRepository.clean()
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
})

test("Deve fazer um pedido", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {idItem: 1, quantity: 2},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3}
        ],
        coupon: "VALE20"
    })
   
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5982)
})

test("Deve fazer um pedido com cupom de desconto expirado", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {idItem: 1, quantity: 2},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(7400)
})

test("Deve fazer um pedido com calculo de frete", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {idItem: 1, quantity: 2},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.freight).toBe(310)
})

test("Deve fazer um pedido calculando o código ", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {idItem: 1, quantity: 2},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3}
        ],
        issueDate: new Date("2020-10-10"),
        coupon: "VALE20_EXPIRED"
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.code).toBe("202000000001")
})

test("Deve fazer um pedido calculando os impostos", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {idItem: 1, quantity: 2},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3}
        ],
        coupon: "VALE20"
    })   
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5982)
    expect(output.taxes).toBe(1054.5)
})

test("Não Deve ser possível fazer um pedido de um item sem estoque", async function(){
    const input = new PlaceOrderInput({
        cpf:"987.599.380-80",
        zipcode: "11.111-11",
        items: [
            {idItem: 1, quantity: 12}
        ],
        coupon: "VALE20"
    })   
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    await expect(placeOrder.execute(input)).rejects.toThrow(new Error("Out of stock"))
})