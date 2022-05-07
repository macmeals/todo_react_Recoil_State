import { useCallback } from "react"
import { useRecoilState } from "recoil"
import { TodoListAtom } from "../atoms/TodoListAtom"

export const useCompleteTodoAtom = () => {
  // 内容、開始日、終了日を格納する変数incompleteAtom、更新関数setIncompleteAtomをセット
  const [incompleteAtom, setIncompleteAtom] = useRecoilState(TodoListAtom)

  const completeTodoAtom = useCallback(
    (id) => {
      {
        // スプレット構文を使い、incompleteAtomを更新
        const completeTodos = incompleteAtom.map((item) => {
          // 対象の要素でない場合、そのまま要素を返却（対象かどうかはidで管理）
          if (item.id !== id) return { ...item }
          // 対象の要素の場合、completeFlag: trueを更新して返す（対象かどうかはidで管理）
          return { ...item, completeFlag: true }
        })
        setIncompleteAtom(completeTodos)
      }
    },
    [incompleteAtom]
  )

  return { completeTodoAtom }
}
