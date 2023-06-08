import {DataSource} from 'typeorm'
import { User } from '../entities/User'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '3656ncs8',
    port: 5432,
    database: "e-commerce",
    entities: [User],
    logging: true,
    synchronize: true
})