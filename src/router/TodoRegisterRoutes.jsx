import { TodoRegister } from "../component/TodoRegister"
import { Page404 } from "../component/Page404"

export const TodoRegisterRoutes = [
  { path: "", exact: true, children: <TodoRegister /> },
  { path: "*", exact: false, children: <Page404 /> },
]
