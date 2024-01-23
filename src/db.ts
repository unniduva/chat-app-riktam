import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/*.ts'], 
  })


export default AppDataSource

