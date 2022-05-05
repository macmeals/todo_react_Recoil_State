import { TodoList } from "../component/pages/TodoList"
import { Page404 } from "../component/pages/Page404"

export const TodoListRoutes = [
  { path: "", exact: true, children: <TodoList /> },
  { path: "*", exact: false, children: <Page404 /> },
]
