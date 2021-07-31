import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from "./schema/schema.mjs";

const app = express()


app.use('/graphiql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


const port = 4000
app.listen(port)
console.log("\nServer start at port: " + port + '\nServer run: http://localhost:4000/graphiql');
