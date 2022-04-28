// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { LinkText } from "./LinkText"
import { Button } from "./Button"
import { useCallback, useEffect } from "react"

// カスタムHook（JSONPlaceHolder用の）
import { useTextGet } from "../hook/useTextGet"

//RecoilとAtomを読み込み
import { useRecoilState } from "recoil"
import { TodoListAtom } from "../atoms/TodoListAtom"

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

  // atomから呼び出した変数TodoListAtomを初期値にし、useRecoilStateを使ってstate管理を行う。
  const [incompleteAtom, setIncompleteAtom] = useRecoilState(TodoListAtom)

  // todoリストを削除する関数onDeleteTodoを定義
  const onDeleteTodo = useCallback(
    (index) => {
      const deleteTodos = [...incompleteAtom] // 削除する対象のデータ配列を関数deleteTodoに格納
      deleteTodos.splice(index, 1) // index番号の要素を削除
      // グローバルStateにdeleteTodosを格納
      setIncompleteAtom(deleteTodos)
    },
    // 第二引数にグローバルStateにdeleteTodosを格納
    [incompleteAtom]
  )

  // todoリストを完了（completeFlagをTrueにする）
  const onCompleteTodo = (index) => {
    const completeTodos = [...incompleteAtom] // 削除する対象のデータ配列を関数completeTodosに格納
    completeTodos.splice(index, 1) // index番号の要素を削除 →対象のTodoを一度消去

    // 完了したTodoを作成（completeFlag: trueとしたTodoを作成）
    const completeTodo = {
      id: incompleteAtom[index].id,
      todo: incompleteAtom[index].todo,
      completeFlag: true,
      from: incompleteAtom[index].from,
      end: incompleteAtom[index].end,
    }
    // 関数completeTodosにcompleteTodoをindexの位置に挿入
    completeTodos.splice(index, 0, completeTodo)

    // スプレット構文を使い、incompleteAtomを更新
    setIncompleteAtom(() => [...completeTodos])
  }

  // カスタムHookから変数useImage,関数imageFetchを取得
  const { useJson, jsonFetch } = useTextGet()

  // TodoList.jsx時のみ関数jsonFetch()を実施
  useEffect(() => {
    jsonFetch()
  }, [])
  // useJsonがNullの時ブランクで、値が入った段階で、useJson.data[1].titleを返す
  console.log(useJson?.data[1].title ?? "")

  return (
    <div css={todoStyle}>
      <h2>Todo一覧</h2>
      <p>{useJson?.data[1].title ?? ""}</p>
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
              {/* Buttonコンポーネントにアロー関数で関数onDeleteTodo(index)をPropsで渡す。indexは引数 */}
              <Button onClickEvent={() => onDeleteTodo(index)}>
                削除(Recoil)
              </Button>
              {/* Buttonコンポーネントにアロー関数で関数onCompleteTodo(index)をPropsで渡す。indexは引数 */}
              <Button onClickEvent={() => onCompleteTodo(index)}>
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
