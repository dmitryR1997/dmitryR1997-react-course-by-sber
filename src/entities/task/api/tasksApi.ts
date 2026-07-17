import { baseApi } from 'shared/api'

import { mapTasksResponse } from '../lib/mapTask'
import type { Task } from '../model/types'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => 'todos',

      transformResponse: mapTasksResponse,
    }),
  }),
})

export const { useGetTasksQuery } = tasksApi
