import { TodoUpdate } from "../component/TodoUpdate"
import { Page404 } from "../component/Page404"

export const TodoUpdateRoutes = [
  { path: "", exact: true, children: <TodoUpdate /> },
  { path: "*", exact: false, children: <Page404 /> },
]
