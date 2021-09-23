import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryDatabase implements ItemRepository {
    getById(id: string): Item | undefined {
        throw new Error("Method not implemented.");
    }

}