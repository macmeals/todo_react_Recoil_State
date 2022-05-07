// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { css } from "@emotion/react"
import { DayPicker } from "react-day-picker" // react-day-picker：v8.0.１
import "react-day-picker/dist/style.css" // react-day-picker：v8.0.１
import { LinkText } from "../LinkText"
import { Button } from "../Button"
import { Image } from "../Image"

//Recoil及び各種ATOMを読み込み
import { useRecoilValue } from "recoil"
import { NewTodoAtom } from "../../atoms/NewTodoAtom"
import { StartDateAtom } from "../../atoms/StartDateAtom"
import { EndDateAtom } from "../../atoms/EndDateAtom"

//カスタムHookを読み込み..
import { useImageGet } from "../../hook/useImageGet"
import { useAddtodoAtom } from "../../hook/useAddtodoAtom"

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

  // NewTodoAtom,startDateAtom,endDateAtomから値を取得する。（Todo内容、開始日、終了日）
  const newTodoAtom = useRecoilValue(NewTodoAtom)
  const startDateAtom = useRecoilValue(StartDateAtom)
  const endDateAtom = useRecoilValue(EndDateAtom)

  // カスタムHookからピカチュウの前面の画像パスを取得,関数imageFetchを取得
  const { apiPokemonBack, imageFetch } = useImageGet()

  // カスタムHookから,Todoに関する処理の関数を取得
  const { todoFetchAtom, valueFetchAtom, startDayFetchAtom, endDayFetchAtom } =
    useAddtodoAtom()

  // Todoページマウント時のみ関数imageFetch()を実施
  useEffect(() => {
    imageFetch()
  }, [])

  return (
    <div css={registerStyle}>
      <h2>Todo登録</h2>
      {/* ピカチュウの画像をImageコンポーネントで呼び出す */}
      <Image url={apiPokemonBack} />
      <div css={matrixStyle}>
        <div css={registerStyle}>
          <p>１．Todo開始日</p>
          <DayPicker onDayClick={startDayFetchAtom} />
          {startDateAtom ? (
            <p> 【Todo開始日】{startDateAtom}</p>
          ) : (
            <p>開始日を選択して下さい</p>
          )}
        </div>
        <div css={registerStyle}>
          <p>２．Todo完了日</p>
          <DayPicker onDayClick={endDayFetchAtom} />
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
        value={newTodoAtom}
        onChange={valueFetchAtom}
      />

      {/* Buttonコンポーネントにアロー関数で関数onAddTodoATom()をPropsで渡す。 */}
      {/* <Button onClickEvent={() => onAddTodoATom()}>登録(Recoil)</Button> */}
      <Button onClickEvent={() => todoFetchAtom()}>登録(Recoil)</Button>
      <Toaster />
      <LinkText destination={"/todolist"}>Todo一覧へ</LinkText>
    </div>
  )
}
