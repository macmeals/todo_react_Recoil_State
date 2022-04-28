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

export const TopPage = () => {
  const { useImage, imageFetch } = useImageGet()

  // Todoページマウント時のみ関数imageFetch()を実施
  useEffect(() => {
    imageFetch()
  }, [])

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
      </div>
    </div>
  )
}
