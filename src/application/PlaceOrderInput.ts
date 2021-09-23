export default class PlaceOrderInput {
    items: any
    cpf: string
    coupon: string
    zipcode: string
    
    constructor({cpf, zipcode,  items, coupon }:{cpf: string, zipcode:string, items: any, coupon: string}) {
        this.cpf = cpf
        this.items = items
        this.coupon = coupon
        this.zipcode = zipcode
    }
}