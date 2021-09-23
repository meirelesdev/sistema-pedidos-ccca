import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase"

test.skip("Deve conectar no banco de dados e listar os itens", async function(){
    const pgPromiseDatabase = new PgPromiseDatabase
    const itens = await pgPromiseDatabase.many("select * from gemus.usuario_gms", [])
    expect(itens).toHaveLength(3)
})