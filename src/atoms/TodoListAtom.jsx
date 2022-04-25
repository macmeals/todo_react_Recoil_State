import { atom } from "recoil"

// TodoListの情報をAtomで状態管理を行う。
export const TodoListAtom = atom({
  key: "TodoList",
  default: [],
})
