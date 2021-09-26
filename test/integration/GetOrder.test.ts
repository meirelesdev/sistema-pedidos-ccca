
import PlaceOrderInput from "../../src/application/DTOs/PlaceOrderInput"
import GetOrder from "../../src/application/usecases/GetOrder"
import PlaceOrder from "../../src/application/usecases/PlaceOrder"
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase"
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory"
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase"
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"

test("Deve consultar um pedido", async function () {
    const input = new PlaceOrderInput({
        cpf: "987.599.380-80",
        zipcode: "11.111-11",
        items: [
            { id: "1", quantity: 2 },
            { id: "2", quantity: 1 },
            { id: "3", quantity: 3 }
        ],
        issueDate: new Date("2020-10-10"),
        coupon: "VALE20"
    })
    const itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance())
    const couponRepository = new CouponRepositoryDatabase(PgPromiseDatabase.getInstance())
    const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance())
    await orderRepository.clean()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator)
    const output = await placeOrder.execute(input)

    const getOrder = new GetOrder(itemRepository, couponRepository, orderRepository)
    const getOrderOutput = await getOrder.execute(output.code)
    expect(getOrderOutput.total).toBe(5982)
})