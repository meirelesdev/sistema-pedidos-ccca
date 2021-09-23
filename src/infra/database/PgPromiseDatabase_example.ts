import pgp from "pg-promise"
import Database from "./Database";

export default class PgPromiseDatabase implements Database {
    pgp: any;

    constructor() {
        this.pgp = pgp()("postgres://postgres:123456@localhost:5432/teste")
    }
    many(query: string, parameters: any) {
        return this.pgp.query(query, parameters)
    }
    one(query: string, parameters: any) {
        return this.pgp.oneOrNone(query, parameters)
    }

}