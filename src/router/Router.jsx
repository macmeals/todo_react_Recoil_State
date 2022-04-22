import React from "react"
import { Route, Routes } from "react-router-dom"
import { TodoRegisterRoutes } from "./TodoRegisterRoutes"
import { TodoListRoutes } from "./TodoListRoutes"
import { TodoUpdateRoutes } from "./TodoUpdateRoutes"
import { TopPage } from "../component/TopPage"
import { Page404 } from "../component/Page404"

export const Router = () => {
  return (
    <Routes>
      <Route exact path="" element={<TopPage />} />
      <Route path="todoregister">
        {TodoRegisterRoutes.map((route1) => (
          <Route
            key={route1.path}
            exact={route1.exact}
            path={`${route1.path}`}
            element={route1.children}
          />
        ))}
      </Route>
      <Route path="todoupdate">
        {TodoUpdateRoutes.map((route2) => (
          <Route
            key={route2.path}
            exact={route2.exact}
            path={`${route2.path}`}
            element={route2.children}
          />
        ))}
      </Route>
      <Route path="todolist">
        {TodoListRoutes.map((route3) => (
          <Route
            key={route3.path}
            exact={route3.exact}
            path={`${route3.path}`}
            element={route3.children}
          />
        ))}
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
