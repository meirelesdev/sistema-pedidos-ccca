export default class PlaceOrderInput {
    items: any
    cpf: string
    coupon: string
    zipcode: string
    issueDate: Date
    
    constructor({cpf, zipcode,  items, coupon, issueDate = new Date() }:{cpf: string, zipcode:string, items: any, coupon: string, issueDate?: Date}) {
        this.cpf = cpf
        this.items = items
        this.coupon = coupon
        this.zipcode = zipcode
        this.issueDate = issueDate
    }
}