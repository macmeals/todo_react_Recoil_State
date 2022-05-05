// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Link } from "react-router-dom"

export const Page404 = () => {
  const Page404Style = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `

  return (
    <div css={Page404Style}>
      <h2>Error:404</h2>
      <p>エラーページです。</p>
      <p>URLを確認下さい</p>
      <Link to="/todoregister">Todo登録</Link>
    </div>
  )
}
