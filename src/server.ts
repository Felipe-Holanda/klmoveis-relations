import app from "./app";
import AppDataSource from "./data-source";

(async () => {

    await AppDataSource.initialize()
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        }).then(() => {
            console.log("Banco de dados inicializado")
        })

    app.listen(4001, () => {
        console.log("Servidor executando na porta 4001")
    })
})()