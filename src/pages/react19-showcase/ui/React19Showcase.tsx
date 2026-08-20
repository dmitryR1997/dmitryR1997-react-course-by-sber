import {
  ActionStateWithReducer,
  FormWithAsyncSave,
  TodoListOptimistic,
} from 'features/react19-examples'

export const React19Showcase = () => {
  return (
    <div>
      <h2>FormWithAsyncSave</h2>
      <FormWithAsyncSave />

      <h2>TodoListOptimistic</h2>
      <TodoListOptimistic />

      <h2>ActionStateWithReducer</h2>
      <ActionStateWithReducer />
    </div>
  )
}
