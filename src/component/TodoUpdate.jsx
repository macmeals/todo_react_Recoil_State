import { Link } from "react-router-dom"

export const TodoUpdate = () => {
  return (
    <div>
      <h1>Todo修正</h1>
      <input type="text" />
      <button>修正</button>
      <Link to="/todolist">Todo一覧へ</Link>
    </div>
  )
}
