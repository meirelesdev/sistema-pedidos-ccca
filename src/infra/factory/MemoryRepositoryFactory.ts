import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import TaxTableRepository from "../../domain/repository/TaxTableRepository";
import TaxTableRepositoryMemory from "../repository/database/TaxTableRepositoryMemory";
import CouponRepositoryMemory from "../repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {
    createTaxTableRepository(): TaxTableRepository {
        return new TaxTableRepositoryMemory()
    }
    createItemRepository(): ItemRepository {
        return new ItemRepositoryMemory()
    }
    createCouponRepository(): CouponRepository {
        return new CouponRepositoryMemory()
    }
    createOrderRepository(): OrderRepository {
        return OrderRepositoryMemory.getInstance()
    }

}