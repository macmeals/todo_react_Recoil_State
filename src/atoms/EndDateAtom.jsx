// 変数endDateAtomと更新関数setEndDateAtomのstate管理

import { atom } from "recoil"

export const EndDateAtom = atom({
  key: "enddate",
  default: undefined,
})
