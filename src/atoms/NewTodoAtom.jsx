// 変数newTodoAtomと更新関数 setnewTodoAtom

import { atom } from "recoil"

// TodoListの情報をAtomで状態管理を行う。
export const NewTodoAtom = atom({
  key: "newTodo",
  default: "",
})
