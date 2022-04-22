// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

// import { useLocation } from "react-router-dom"
// import { useState } from "react"
// import { useEffect } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { LinkText } from "./LinkText"
import { Button } from "./Button"
import { useCallback } from "react"
// import axios from "axios"
import { useEffect } from "react"

// カスタムHook（JSONPlaceHolder用の）
import { useTextGet } from "../hook/useTextGet"

// グローバルStateを取得
import { useContext } from "react"
import { TodoListContext } from "./providers/TodoListProvider"

export const TodoList = () => {
  const todoStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `

  const todoTitleStyle = css`
    width: 80vw;
    background-color: #eee6e6;
  `
  const todoListStyle = css`
    width: 80vw;
    padding-inline-start: 0;
  `

  // StyledListからpropsを受け取り、todoFlagがtrueの場合、text-decoration:line-throughとなる
  const StyledList = styled.li`
    display: flex;
    padding-left: 20px;
    align-items: center;
    > p {
      width: 20vw;
      text-decoration: ${(props) => (props.todoflag ? "line-through" : "")};
      margin-block-start: 0;
      margin-block-end: 0;
    }
    &:nth-of-type(2n) {
      background-color: #ffeded;
    }
  `

  const TodoTitles = styled.div`
    display: flex;
    margin-left: 20px;
    > p {
      width: 20vw;
    }
  `

  // const { state } = useLocation() // 画面変移（Linkコンポーネント）のPropを受け取る為のHook。

  // グローバルStateの変数 incompleteTodos、setIncompleteTodosをuseContext利用で取り出す。
  const { incompleteTodos, setIncompleteTodos } = useContext(TodoListContext)

  // const [jsontext, setjsonText] = useState([])

  // 画面変移時に一度だけ、TodoListのStateを更新する。
  // その為UseEffectの第二変数に[]を記載
  // useEffect(() => {
  //   setTodoLists(state.state)
  // }, [])

  // todoリストを削除する関数onDeleteTodoを定義
  const onDeleteTodo = useCallback(
    (index) => {
      // const deleteTodos = [...todoLists] // 削除する対象のデータ配列を関数deleteTodoに格納
      const deleteTodos = [...incompleteTodos] // 削除する対象のデータ配列を関数deleteTodoに格納
      deleteTodos.splice(index, 1) // index番号から１番目の要素を削除
      // setTodoLists(deleteTodos)
      // setTodoListsでtodoListsにstate保存

      // グローバルStateにdeleteTodosを格納
      setIncompleteTodos(deleteTodos)
    },
    // [todoLists]
    // 第二引数にグローバルStateにdeleteTodosを格納
    [incompleteTodos]
  )

  // todoリストを完了（completeFlagをTrueにする）関数onCompleteTodoを定義
  const onCompleteTodo = useCallback(
    (index) => {
      // const CompleteTodos = [...todoLists] // 完了する対象のデータ配列を関数CompTodosTodoに格納

      // グローバルStateを関数CompTodosTodoに格納
      const CompleteTodos = [...incompleteTodos]
      CompleteTodos[index].completeFlag = true //対象のデータ配列のCompleteFlagをTrueにする
      // setTodoLists(CompleteTodos) // setTodoListsでtodoListsにstate保存

      // グローバルStateにCompleteTodosを格納
      setIncompleteTodos(CompleteTodos)
    },
    // [todoLists]
    // 第二引数にグローバルStateにdeleteTodosを格納
    [incompleteTodos]
  )

  // const textApi = async () => {
  //   try {
  //     // jsonPlaceholderからユーザー情報をaxiosで取得
  //     const response = await axios.get(
  //       "https://jsonplaceholder.typicode.com/todos"
  //     )
  //     // jsonPlaceholderからユーザー情報をStateで保存
  //     setjsonText(response.data[1].title)
  //   } catch {
  //     console.log("テキストが取得できませんでした")
  //   }
  // }
  // textApi()

  // カスタムHookから変数useImage,関数imageFetchを取得
  const { useJson, jsonFetch } = useTextGet()

  // TodoList.jsx時のみ関数jsonFetch()を実施
  useEffect(() => {
    jsonFetch()
  }, [])
  // useJsonがNullの時ブランクで、値が入った段階で、useJson.data[1].titleを返す
  console.log(useJson?.data[1].title ?? "")

  // console.log(useJson.data[1].title)
  return (
    <div css={todoStyle}>
      <h2>Todo一覧</h2>
      {/* sonPlaceholderの情報を表示 */}
      {/* <p>{jsontext}</p> */}
      <p>{useJson?.data[1].title ?? ""}</p>
      {/* <p>{useJson.data[1].title}</p> */}
      <div css={todoTitleStyle}>
        <TodoTitles>
          <p>Todo開始日</p>
          <p>Todo終了日</p>
          <p>Todoタスク</p>
        </TodoTitles>
      </div>
      <ul css={todoListStyle}>
        {/* {todoLists.map((todos, index) => { */}
        {incompleteTodos.map((todos, index) => {
          return (
            <StyledList key={todos.id} todoflag={todos.completeFlag}>
              <p>{todos.from}</p>
              <p>{todos.end}</p>
              <p>{todos.todo}</p>
              {/* Buttonコンポーネントにアロー関数で関数onDeleteTodo(index)をPropsで渡す。indexは引数 */}
              <Button onClickEvent={() => onDeleteTodo(index)}>削除</Button>
              {/* Buttonコンポーネントにアロー関数で関数onCompleteTodo(index)をPropsで渡す。indexは引数 */}
              <Button onClickEvent={() => onCompleteTodo(index)}>完了</Button>
            </StyledList>
          )
        })}
      </ul>
      <LinkText destination={"/todoregister"}>Todo登録</LinkText>
    </div>
  )
}
