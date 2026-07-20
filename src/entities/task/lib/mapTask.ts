import type { TaskDto } from '../api/types'
import type { Task } from '../model/types'

export const mapTasksResponse = (response: TaskDto[]): Task[] =>
  response.map(({ id, title, completed }) => ({
    id: String(id),
    title,
    completed,
  }))
