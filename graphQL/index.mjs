import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";

//подключаем query
import { queryType } from "./schema/query.mjs";
//подключаем mutation
import { mutationType } from "./schema/mutation.mjs";

//определяем схему
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});


//настройка express
const port = 4000;
const app = express();

//Устанавливаем graphQL nodejs server
app.use("/graphiql", graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);


app.listen(port);
console.log(
  "\nServer start at port: " + port +
    "\nServer run: http://localhost:4000/graphiql"
);
