// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import logo from "./logo.svg"
import { Router } from "./router/Router"
import { BrowserRouter } from "react-router-dom"
import { css } from "@emotion/react"

export const App = () => {
  const headerStyle = css`
    text-align: center;
  `

  const appHeader = css`
    background-color: #282c34;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 40vmin;
  `

  const appLogo = css`
    height: 20vmin;
    animation: App-logo-spin infinite 20s linear;
    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `

  return (
    <div>
      <div css={headerStyle}>
        <header css={appHeader}>
          <img src={logo} css={appLogo} alt="logo" />
        </header>
      </div>
      <BrowserRouter>
        <Router /> {/* //Router.jsxを呼び出す。 */}
      </BrowserRouter>
    </div>
  )
}
