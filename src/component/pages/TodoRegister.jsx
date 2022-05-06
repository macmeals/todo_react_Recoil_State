// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

// import { useState, useEffect } from "react"
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
// import { Toaster } from "react-hot-toast"
import { css } from "@emotion/react"
import { DayPicker } from "react-day-picker" // react-day-picker：v8.0.１
import "react-day-picker/dist/style.css" // react-day-picker：v8.0.１
import { LinkText } from "../LinkText"
import { Button } from "../Button"
import { Image } from "../Image"

//Recoilを読み込み及び各種ATOMを読み込み
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useRecoilState } from "recoil"
import { TodoListAtom } from "../../atoms/TodoListAtom"
import { NewTodoAtom } from "../../atoms/NewTodoAtom"
import { StartDateAtom } from "../../atoms/StartDateAtom"
import { EndDateAtom } from "../../atoms/EndDateAtom"

//カスタムHookを読み込み
import { useImageGet } from "../../hook/useImageGet"
import { useAddtodo } from "../../hook/useAddtodo"

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
  const [newTodoAtom, setNewTodoAtom] = useRecoilState(NewTodoAtom)

  //  初期値Todoの開始日のvalueを空にセット、状態を格納する変数setStartDateをセット
  const [startDateAtom, setStartDateAtom] = useRecoilState(StartDateAtom)

  //  初期値Todoの終了日のvalueを空にセット、状態を格納する変数setEndDateをセット
  const [endDateAtom, setEndDateAtom] = useRecoilState(EndDateAtom)

  // atomから呼び出した変数TodoListAtomを初期値にし、useRecoilStateを使ってstate管理を行う。
  const [incompleteAtom, setIncompleteAtom] = useRecoilState(TodoListAtom)

  // カスタムHookから変数useImage,関数imageFetchを取得
  const { apiImage, imageFetch } = useImageGet()

  // カスタムHookから,関数todoFetchAtomを取得
  const { todoFetchAtom } = useAddtodo()

  // Todoページマウント時のみ関数imageFetch()を実施
  useEffect(() => {
    imageFetch()
  }, [])

  // todoタスクのテキストボックスで入力した値を保存する
  // const setNewTodoAtom = useSetRecoilState(NewTodoAtom)
  const changeValue = (e) => setNewTodoAtom(e.target.value)

  // 開始日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をstartDateの状態を保管
  const handleStartDay = (day) => {
    setStartDateAtom(day.toLocaleDateString())
  }
  // 終了日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をendDateの状態を保管
  const handleEndDay = (day) => {
    setEndDateAtom(day.toLocaleDateString())
  }

  // Recoilで呼び出したAtomを格納した変数incompleteAtomを使ってTodoリストを格納する。
  // >>>>この部分はuseAddtodoへ移動予定。まだ移動させていません >>>>>>>
  const onAddTodoATom = () => {
    if (newTodoAtom === "") return
    const newTodos = [
      ...incompleteAtom,
      {
        id: incompleteAtom.length,
        todo: newTodoAtom,
        completeFlag: false,
        from: startDateAtom,
        end: endDateAtom,
      },
    ]
    setIncompleteAtom(newTodos) // setIncompleteAtomにnewTodosの状態を登録
    setNewTodoAtom("") // setNewTodoに空の状態を登録
    toast.success("Todoを登録しました.")
    setStartDateAtom(undefined) // 開始日をリセット
    setEndDateAtom(undefined) // 終了日をリセット
  }

  // >>>> ここまでuseAddtodoへ移動予定。まだ移動させていません >>>>>>>
  return (
    <div css={registerStyle}>
      <h2>Todo登録</h2>
      {/* ピカチュウの画像をImageコンポーネントで呼び出す */}
      <Image url={apiImage.data.sprites.back_female} />
      <div css={matrixStyle}>
        <div css={registerStyle}>
          <p>１．Todo開始日</p>
          <DayPicker onDayClick={handleStartDay} />
          {startDateAtom ? (
            <p> 【Todo開始日】{startDateAtom}</p>
          ) : (
            <p>開始日を選択して下さい</p>
          )}
        </div>
        <div css={registerStyle}>
          <p>２．Todo完了日</p>
          <DayPicker onDayClick={handleEndDay} />
          {endDateAtom ? (
            <p>【Todo終了日】{endDateAtom}</p>
          ) : (
            <p>終了日を選択して下さい</p>
          )}
        </div>
      </div>
      <p>３．Todoタスク</p>
      <input
        css={inputStyle}
        type="text"
        // value={newTodo}
        value={newTodoAtom}
        onChange={changeValue}
      />

      {/* Buttonコンポーネントにアロー関数で関数onAddTodoATom()をPropsで渡す。 */}
      <Button onClickEvent={() => onAddTodoATom()}>登録(Recoil)</Button>
      <Button onClickEvent={() => todoFetchAtom()}>登録2(Recoil)</Button>
      <Toaster />
      <LinkText destination={"/todolist"}>Todo一覧へ</LinkText>
    </div>
  )
}
