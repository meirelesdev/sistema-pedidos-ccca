// import pgp from "pg-promise"
// import Database from "./Database";

// export default class PgPromiseDatabase implements Database {
//     pgp: any;

//     constructor() {
//         this.pgp = pgp()("postgres://postgres:123456@localhost:5432/teste")
//     }
//     none(query: string, parameters: any): void {
//         return this.pgp.one(query, parameters)
//     }
//     many(query: string, parameters: any) {
//         return this.pgp.query(query, parameters)
//     }
//     one(query: string, parameters: any) {
//         return this.pgp.one(query, parameters)
//     }
// }