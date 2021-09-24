export default class GetOrderOutput {
    code: string
    freight: number
    total: number
    orderItems: {itemDescription: string, price: number, quantity: number} []
    constructor({code, freight, total, orderItems}: { code:string, freight: number, total: number, orderItems: []}){
        this.code = code
        this.freight = freight
        this.total = total,
        this.orderItems = orderItems
    }
}