// 変数incompleteAtomと更新関数 setIncompleteAtom

import { atom } from "recoil"

// TodoListの情報をAtomで状態管理を行う。
export const TodoListAtom = atom({
  key: "incompleteTodo",
  default: [],
})
