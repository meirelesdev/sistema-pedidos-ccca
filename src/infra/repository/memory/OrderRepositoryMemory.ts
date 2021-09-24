import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    
    orders: Order[];

    constructor(){
        this.orders = []
    }
    save(order: Order){
        this.orders.push(order)
    }    
    get(code: string): Order {
        const order = this.orders.find(order => order.code.value === code)
        if(!order) throw new Error("Order not found");
        return order
    }
    count(): number {
        return this.orders.length
    }
}