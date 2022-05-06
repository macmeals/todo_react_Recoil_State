// react-day-pickerを読み込み
import toast from "react-hot-toast"

//Recoilを読み込み及び各種ATOMを読み込み
import { useRecoilState } from "recoil"
import { TodoListAtom } from "../atoms/TodoListAtom"
import { NewTodoAtom } from "../atoms/NewTodoAtom"
import { StartDateAtom } from "../atoms/StartDateAtom"
import { EndDateAtom } from "../atoms/EndDateAtom"

// Todo内容の変数newTodoAtom、更新関数setNewTodoAtomをセット
const [newTodoAtom, setNewTodoAtom] = useRecoilState(NewTodoAtom)

// Todoの開始日の変数startDateAtom、更新関数setStartDateAtomをセット
const [startDateAtom, setStartDateAtom] = useRecoilState(StartDateAtom)

// Todoの終了日の変数endDateAtom、更新関数setEndDateAtomをセット
const [endDateAtom, setEndDateAtom] = useRecoilState(EndDateAtom)

// 内容、開始日、終了日を格納する変数incompleteAtom、更新関数setIncompleteAtomをセット
const [incompleteAtom, setIncompleteAtom] = useRecoilState(TodoListAtom)

export const useAddtodo = () => {
  const todoFetchAtom = () => {
    if (newTodoAtom === "") return
    const newTodos = [
      ...incompleteAtom,
      {
        id: incompleteAtom.length,
        todo: newTodoAtom,
        completeFlag: false,
        from: startDateAtom,
        end: endDateAtom,
      },
    ]
    setIncompleteAtom(newTodos) // setIncompleteAtomにnewTodosの状態を登録
    setNewTodoAtom("") // setNewTodoに空の状態を登録
    toast.success("Todoを登録しました.")
    setStartDateAtom(undefined) // 開始日をリセット
    setEndDateAtom(undefined) // 終了日をリセット
  }

  return { todoFetchAtom }
}
