import pgp from "pg-promise"
import Database from "./Database";

export default class PgPromiseDatabase implements Database {
    pgp: any;

    constructor() {
        this.pgp = pgp()("postgres://postgres:developerIC97@localhost:5433/teste")
    }
    many(query: string, parameters: any) {
        return this.pgp.query(query, parameters)
    }
    one(query: string, parameters: any) {
        return this.pgp.oneOrNone(query, parameters)
    }

}