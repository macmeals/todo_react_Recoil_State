//React 18に修正

import React from "react"
// import ReactDOM from "react-dom"
import { StrictMode } from "react"
import "./index.css"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import { createRoot } from "react-dom/client"
const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

// グローバルStateをImport
// import { TodoListProvider } from "./component/providers/TodoListProvider"

// グローバルStateをRecoilとして利用するため、それをインポート
import { RecoilRoot } from "recoil"

root.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>
)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
