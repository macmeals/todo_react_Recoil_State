import { createContext } from "react"
import { useState } from "react"

//contextの器を作成
export const TodoListContext = createContext({})

export const TodoListProvider = (props) => {
  // 初期値incompTodosにオブジェクト型の空配列をセット、状態をsetIncompleteTodosに格納する
  const [incompleteTodos, setIncompleteTodos] = useState([])
  const { children } = props

  return (
    //valueに渡したい値を渡す。
    <TodoListContext.Provider value={{ incompleteTodos, setIncompleteTodos }}>
      {children}
    </TodoListContext.Provider>
  )
}
