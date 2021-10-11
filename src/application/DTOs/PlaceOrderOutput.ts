export default class PlaceOrderOutput {
    code: string
    freight: number
    total: number
    taxes: number

    constructor({code, freight, taxes, total}:{code: string, freight: number, taxes: number, total: number}) {
        this.code = code
        this.freight = freight
        this.taxes = taxes
        this.total = total
    }
}