// 変数startDateAtomと更新関数setStartDateAtomのstate管理

import { atom } from "recoil"

export const StartDateAtom = atom({
  key: "startdate",
  default: undefined,
})
