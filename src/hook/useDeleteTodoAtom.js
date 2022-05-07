import { useCallback } from "react"
import { useRecoilState } from "recoil"
import { TodoListAtom } from "../atoms/TodoListAtom"

export const useDeleteTodoAtom = () => {
  // 内容、開始日、終了日を格納する変数incompleteAtom、更新関数setIncompleteAtomをセット
  const [incompleteAtom, setIncompleteAtom] = useRecoilState(TodoListAtom)

  const deleteTodoAtom = useCallback(
    (index) => {
      const deleteTodos = [...incompleteAtom] // 削除する対象のデータ配列を関数deleteTodoに格納
      deleteTodos.splice(index, 1) // index番号の要素を削除
      // グローバルStateにdeleteTodosを格納
      setIncompleteAtom(deleteTodos)
    },
    [incompleteAtom]
  )

  return { deleteTodoAtom }
}
