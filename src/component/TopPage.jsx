// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import React from "react"
import { Link } from "react-router-dom"
import { css } from "@emotion/react"
import { DayPicker } from "react-day-picker" //react-day-picker v8.0.4
import "react-day-picker/dist/style.css" //react-day-picker v8.0.4
import { useEffect } from "react"
import { Image } from "./Image"
// カスタムHookを取得
import { useImageGet } from "../hook/useImageGet"

// グローバルStateを取得
import { useContext } from "react"
import { TodoListContext } from "./providers/TodoListProvider"

export const TopPage = () => {
  const { incompleteTodos } = useContext(TodoListContext)
  console.log(incompleteTodos)

  const { useImage, imageFetch } = useImageGet()

  // Todoページマウント時のみ関数imageFetch()を実施
  useEffect(() => {
    imageFetch()
  }, [])

  // 関数imageFetch()を実施時、変数useImageが更新され、コンソール表示
  useEffect(() => {
    console.log(useImage)
  }, [useImage])

  const topStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `

  return (
    <div>
      <div css={topStyle}>
        <h1>Todoアプリ</h1>
        <Link to="/todoregister">Todo登録</Link>
        <DayPicker />
        <Image url={useImage.data.sprites.front_default} />
        {/* 以下でも問題なし */}
        {/* <Image url={useImage?.data.sprites.front_default ?? ""} /> */}
      </div>
    </div>
  )
}
