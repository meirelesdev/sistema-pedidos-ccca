import axios from "axios"

test("Deve invocar a API /orders/${code}", async function(){
    const response = await axios({
        url: "http://127.0.0.1:3000/orders/202100000001",
        method: "get"
    })
    const order = response.data
    expect(order.code).toBe("202100000001")
})