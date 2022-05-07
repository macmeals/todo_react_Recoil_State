// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { LinkText } from "../LinkText"
import { Button } from "../Button"
import { useEffect } from "react"

// カスタムHook（JSONPlaceHolder用）
import { useTextGet } from "../../hook/useTextGet"
import { useDeleteTodoAtom } from "../../hook/useDeleteTodoAtom"
import { useCompleteTodoAtom } from "../../hook/useCompleteTodoAtom"

//RecoilとAtomを読み込み
import { useRecoilValue } from "recoil"
import { TodoListAtom } from "../../atoms/TodoListAtom"

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

  const incompleteAtom = useRecoilValue(TodoListAtom)

  // カスタムHookから変数textTitle,関数imageFetch、Todo削除と完了の処理の関数deleteTodoAtom、completeTodoAtomを取得
  const { textTitle, jsonFetch } = useTextGet()
  const { deleteTodoAtom } = useDeleteTodoAtom()
  const { completeTodoAtom } = useCompleteTodoAtom()

  // TodoList.jsx時のみ関数jsonFetch()を実施
  useEffect(() => {
    jsonFetch()
  }, [])

  return (
    <div css={todoStyle}>
      <h2>Todo一覧</h2>
      <p>{textTitle}</p>
      <div css={todoTitleStyle}>
        <TodoTitles>
          <p>Todo開始日</p>
          <p>Todo終了日</p>
          <p>Todoタスク</p>
        </TodoTitles>
      </div>
      <ul css={todoListStyle}>
        {/* {todoLists.map((todos, index) => { */}
        {incompleteAtom.map((todos, index) => {
          return (
            <StyledList key={todos.id} todoflag={todos.completeFlag}>
              <p>{todos.from}</p>
              <p>{todos.end}</p>
              <p>{todos.todo}</p>
              {/* Buttonコンポーネントにアロー関数で関数deleteTodoAtom(index)をPropsで渡す。indexは引数 */}
              <Button onClickEvent={() => deleteTodoAtom(index)}>
                削除(Recoil)
              </Button>
              {/* Buttonコンポーネントにアロー関数で関数onCompleteTodoを定義。ポイントは引数にidを引き渡す事*/}
              <Button onClickEvent={() => completeTodoAtom(todos.id)}>
                完了(Recoil)
              </Button>
            </StyledList>
          )
        })}
      </ul>
      <LinkText destination={"/todoregister"}>Todo登録</LinkText>
    </div>
  )
}
