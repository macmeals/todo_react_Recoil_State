import { TodoUpdate } from "../component/pages/TodoUpdate"
import { Page404 } from "../component/pages/Page404"

export const TodoUpdateRoutes = [
  { path: "", exact: true, children: <TodoUpdate /> },
  { path: "*", exact: false, children: <Page404 /> },
]
