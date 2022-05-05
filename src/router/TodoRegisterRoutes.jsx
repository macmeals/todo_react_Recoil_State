import { TodoRegister } from "../component/pages/TodoRegister"
import { Page404 } from "../component/pages/Page404"

export const TodoRegisterRoutes = [
  { path: "", exact: true, children: <TodoRegister /> },
  { path: "*", exact: false, children: <Page404 /> },
]
