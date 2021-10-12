import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";

export default class StockEntryRepositoryMemory implements StockEntryRepository {
    stockEntrys: StockEntry[];
    constructor() {
        this.stockEntrys = [
            new StockEntry(1, "in", 10, new Date()),
            new StockEntry(2, "in", 10, new Date()),
            new StockEntry(3, "in", 10, new Date()),
        ]
    }   
    getByIdItem(idItem: number): Promise<StockEntry[]> {
        return Promise.resolve(this.stockEntrys.filter(stockEntry => stockEntry.idItem === idItem))
    }
    async save(stockEntry: StockEntry): Promise<void> {
        this.stockEntrys.push(stockEntry)
    }
    async clean(): Promise<void> {
        this.stockEntrys = this.stockEntrys.filter(stockEntry => stockEntry.operation === 'in')
    }
}