import { TodoList } from "../component/TodoList"
import { Page404 } from "../component/Page404"

export const TodoListRoutes = [
  { path: "", exact: true, children: <TodoList /> },
  { path: "*", exact: false, children: <Page404 /> },
]
