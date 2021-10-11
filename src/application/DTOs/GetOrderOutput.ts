import TaxTable from "../../domain/entity/TaxTable"

export default class GetOrderOutput {
    code: string
    freight: number
    total: number
    orderItems: {itemDescription: string, price: number, quantity: number} []
    taxes: any
    constructor({code, freight, taxes, total, orderItems}: { code:string, freight: number, taxes: number, total: number, orderItems: []}){
        this.code = code
        this.freight = freight
        this.taxes = taxes
        this.total = total,
        this.orderItems = orderItems
    }
}