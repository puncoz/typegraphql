import { GraphQLServer } from "graphql-yoga"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import ProjectResolver from "./resolvers/ProjectResolver"
import TaskResolver from "./resolvers/TaskResolver"

const bootstrap = async () => {
    const schema = await buildSchema({
        resolvers: [ProjectResolver, TaskResolver],
        emitSchemaFile: true
    })

    const server = new GraphQLServer({
        schema
    })

    await server.start(({port}) => console.log(`Server started on port: ${port}`))
}

bootstrap()
