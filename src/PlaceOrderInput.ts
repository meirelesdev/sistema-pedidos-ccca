export default class PlaceOrderInput {
    items: any
    cpf: string
    coupon: string
    
    constructor({cpf, items, coupon }:{cpf: string, items: any, coupon: string}) {
        this.cpf = cpf
        this.items = items
        this.coupon = coupon
    }
}