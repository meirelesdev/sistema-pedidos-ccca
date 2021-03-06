import Coupon from "../../src/domain/entity/Coupon";
import Order from "../../src/domain/entity/Order"

test("Não deve criar um pedido com CPF inválido", function(){
    const cpf = "111.111.111-11"
    expect(()=> new Order(cpf) ).toThrow(new Error("Invalid CPF"))
});

test("Deve criar um pedido com 3 itens", function(){
    const cpf = "987.599.380-80"
    const order = new Order(cpf)
    order.addItem("Guitarra", 1000, 2)
    order.addItem("Amplificador", 5000, 1)
    order.addItem("Cabo", 30, 3)
    const total = order.getTotal()
    expect(total).toBe(7090)
})
test("Deve criar um pedido com cupom de desconto", function(){
    const cpf = "987.599.380-80"
    const order = new Order(cpf)

    order.addItem("1", 1000, 2)
    order.addItem("2", 5000, 1)
    order.addItem("3", 30, 3)
    order.addCoupon(new Coupon("VALE20", 20, new Date()))

    const total = order.getTotal()
    expect(total).toBe(5672)
})

test("Deve criar um pedido com cupom de desconto expirado", function(){
    const cpf = "987.599.380-80"
    const order = new Order(cpf)

    order.addItem("1", 1000, 2)
    order.addItem("2", 5000, 1)
    order.addItem("3", 30, 3)
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-10-10")))
    const total = order.getTotal()
    expect(total).toBe(7090)
})
test("Deve criar um pedido calculando o codigo", function(){
    const cpf = "987.599.380-80"
    const order = new Order(cpf, new Date("2020-10-10"), 2)

    order.addItem("1", 1000, 2)
    order.addItem("2", 5000, 1)
    order.addItem("3", 30, 3)
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-10-10")))
    
    expect(order.code.value).toBe("202000000002")
})