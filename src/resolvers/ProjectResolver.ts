import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { ProjectData, projects, TaskData, tasks } from "../data"
import Project from "../schemas/Project"

@Resolver(of => Project)
export default class {
    @Query(returns => Project, {nullable: true})
    projectByName(@Arg("name") name: string): ProjectData | undefined {
        return projects.find(project => project.name === name)
    }

    @FieldResolver()
    tasks(@Root() projectData: ProjectData): TaskData[] {
        return tasks.filter(task => task.project_id === projectData.id)
    }
}
