// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react"
// import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { css } from "@emotion/react"
import { DayPicker } from "react-day-picker" // react-day-picker：v8.0.１
import "react-day-picker/dist/style.css" // react-day-picker：v8.0.１
import { LinkText } from "../LinkText"
import { Button } from "../Button"
import { Image } from "../Image"

//Recoilを読み込み
import { useRecoilState } from "recoil"
import { TodoListAtom } from "../../atoms/TodoListAtom"

//カスタムHookを読み込み
import { useImageGet } from "../../hook/useImageGet"

export const TodoRegister = () => {
  const registerStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `
  const matrixStyle = css`
    display: flex;
    width: 50vw;
    justify-content: space-between;
  `
  const inputStyle = css`
    width: 600px;
  `

  //  初期値Todoタスクのvalueを空にセット、状態を格納する変数setNewTodoをセット
  const [newTodo, setNewTodo] = useState("")

  //  初期値Todoの開始日のvalueを空にセット、状態を格納する変数setStartDateをセット
  const [startDate, setStartDate] = useState(undefined)

  //  初期値Todoの終了日のvalueを空にセット、状態を格納する変数setEndDateをセット
  const [endDate, setEndDate] = useState(undefined)

  // atomから呼び出した変数TodoListAtomを初期値にし、useRecoilStateを使ってstate管理を行う。
  const [incompleteAtom, setIncompleteAtom] = useRecoilState(TodoListAtom)

  // カスタムHookから変数useImage,関数imageFetchを取得
  const { useImage, imageFetch } = useImageGet()

  // Todoページマウント時のみ関数imageFetch()を実施
  useEffect(() => {
    imageFetch()
  }, [])

  // todoタスクのテキストボックスで入力した値を保存する
  const changeValue = (e) => setNewTodo(e.target.value)

  // 開始日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をstartDateの状態を保管
  const handleStartDay = (day) => {
    setStartDate(day.toLocaleDateString())
  }
  // 終了日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をendDateの状態を保管
  const handleEndDay = (day) => {
    setEndDate(day.toLocaleDateString())
  }

  // Recoilで呼び出したAtomを格納した変数incompleteAtomを使ってTodoリストを格納する。
  const onAddTodoATom = () => {
    if (newTodo === "") return
    const newTodos = [
      ...incompleteAtom,
      {
        id: incompleteAtom.length,
        todo: newTodo,
        completeFlag: false,
        from: startDate,
        end: endDate,
      },
    ]
    setIncompleteAtom(newTodos) // setIncompleteAtomにnewTodosの状態を登録
    setNewTodo("") // setNewTodoに空の状態を登録
    toast.success("Todoを登録しました.")
    setStartDate(undefined) // 開始日をリセット
    setEndDate(undefined) // 終了日をリセット
  }

  return (
    <div css={registerStyle}>
      <h2>Todo登録</h2>
      {/* ピカチュウの画像をImageコンポーネントで呼び出す */}
      <Image url={useImage.data.sprites.back_female} />
      <div css={matrixStyle}>
        <div css={registerStyle}>
          <p>１．Todo開始日</p>
          <DayPicker onDayClick={handleStartDay} />
          {startDate ? (
            <p> 【Todo開始日】{startDate}</p>
          ) : (
            <p>開始日を選択して下さい</p>
          )}
        </div>
        <div css={registerStyle}>
          <p>２．Todo完了日</p>
          <DayPicker onDayClick={handleEndDay} />
          {endDate ? (
            <p>【Todo終了日】{endDate}</p>
          ) : (
            <p>終了日を選択して下さい</p>
          )}
        </div>
      </div>
      <p>３．Todoタスク</p>
      <input
        css={inputStyle}
        type="text"
        value={newTodo}
        onChange={changeValue}
      />

      {/* Buttonコンポーネントにアロー関数で関数onAddTodoATom()をPropsで渡す。 */}
      <Button onClickEvent={() => onAddTodoATom()}>登録(Recoil)</Button>
      <Toaster />
      <LinkText destination={"/todolist"}>Todo一覧へ</LinkText>
    </div>
  )
}
