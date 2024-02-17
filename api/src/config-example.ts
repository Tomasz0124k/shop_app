
const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_URL = process.env.MONGO

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 8000


export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    // mysql: {
    //     DB_HOST: '127.0.0.1',
    //     DB_USER: 'root',
    //     DB_PASS: 'root',
    //     DB_NAME: 'shop',
    //     DB_CONNECTION_LIMIT: 10
    // },
    db: {
        host: "postgres_db",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "shop",
    },
    mailer: {
        address: 'appshopv24@gmail.com',
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        password: '',
        sender: 'KusArch.',
    },
    viewUrl: 'http://localhost:9000',
    secretkey: ''
}