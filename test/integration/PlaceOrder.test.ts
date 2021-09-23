import CouponRepositoryMemory from "../../src/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/ItemRepositoryMemory"
import OrderRepositoryMemory from "../../src/OrderRepositoryMemory"
import PlaceOrder from "../../src/PlaceOrder"
import PlaceOrderInput from "../../src/PlaceOrderInput"
import ZipcodeCalculatorAPIMemory from "../../src/ZipcodeCalculatorAPIMemory"

test("Deve fazer um pedido", function(){
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
    const itemRepository = new ItemRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator)
    const output = placeOrder.execute(input)
    expect(output.total).toBe(5982)
})
test("Deve fazer um pedido com cupom de desconto expirado", function(){
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
    const itemRepository = new ItemRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator)
    const output = placeOrder.execute(input)
    expect(output.total).toBe(7400)
})
test("Deve fazer um pedido com calculo de frete", function(){
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
    const itemRepository = new ItemRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator)
    const output = placeOrder.execute(input)
    expect(output.freight).toBe(310)
})