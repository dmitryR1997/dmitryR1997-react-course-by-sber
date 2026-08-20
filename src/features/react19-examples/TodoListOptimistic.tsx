import { useOptimistic, useState } from 'react'

type Todo = {
  id: string
  title: string
  pending?: boolean
}

const request = () => new Promise((resolve) => setTimeout(resolve, 1000))

export const TodoListOptimistic = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], title: string): Todo[] => [
      ...state,
      { id: `pending-${state.length}`, title, pending: true },
    ]
  )

  const addTodo = async (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim()

    if (!title) {
      return
    }

    addOptimisticTodo(title)
    await request()

    setTodos((prevTodos) => [...prevTodos, { id: crypto.randomUUID(), title }])
  }

  return (
    <form action={addTodo}>
      <input name="title" type="text" />

      <button type="submit">Добавить</button>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {todo.pending && ' сохраняем…'}
          </li>
        ))}
      </ul>
    </form>
  )
}
