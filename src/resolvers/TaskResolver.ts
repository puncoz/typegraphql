import { Arg, FieldResolver, Mutation, Query, Root } from "type-graphql"
import { ProjectData, projects, TaskData, tasks } from "../data"
import Task from "../schemas/Task"

export default class {
    @Query(returns => [Task])
    fetchTasks(): TaskData[] {
        return tasks
    }

    @Query(returns => Task, {nullable: true})
    getTask(@Arg("id") id: number): TaskData | undefined {
        return tasks.find(task => task.id === id)
    }

    @FieldResolver()
    project(@Root() task: TaskData): ProjectData | undefined {
        return projects.find(project => project.id === task.project_id)
    }

    @Mutation(returns => Task)
    markAsCompleted(@Arg("taskId") taskId: number): TaskData {
        const task = tasks.find(task => task.id === taskId)

        if (!task) {
            throw new Error(`Task not found with id: ${taskId}`)
        }

        if (task.completed) {
            throw new Error(`Task with id ${taskId} is already completed.`)
        }

        task.completed = true

        return task
    }
}
