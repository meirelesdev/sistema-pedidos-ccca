import PlaceOrder from "./PlaceOrder"

test("Deve fazer um pedido", function(){
    const input = {
        cpf:"987.599.380-80",
        items: [
            {description:"Guitarra", price:1000, quantity: 2},
            {description:"Amplificador", price:5000, quantity: 1},
            {description:"Cabo", price:30, quantity: 3}
        ],
        coupon: "VALE20"
    }
    const placeOrder = new PlaceOrder()
    const output = placeOrder.execute(input)
    expect(output.total).toBe(5672)
})