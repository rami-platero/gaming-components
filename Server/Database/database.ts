import {DataSource} from 'typeorm'
import { User } from '../entities/User'
import { Comment } from '../entities/Comment'
import { Product } from '../entities/Product'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '3656ncs8',
    port: 5432,
    database: "e-commerce",
    entities: [User,Comment,Product],
    logging: true,
    synchronize: true
})