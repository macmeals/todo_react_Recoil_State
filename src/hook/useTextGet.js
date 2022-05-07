// ポケモンAPIから画像情報を取得する部分をカスタムHook化
import axios from "axios"

// 無駄なレンダリングを防ぎ、State状態を管理する。
import { useState } from "react"
import { useCallback } from "react"

const url = "https://jsonplaceholder.typicode.com/todos"

export const useTextGet = () => {
  // useJsonのState初期値はnullとする。
  const [textTitle, setTextTitle] = useState("")
  const jsonFetch = useCallback(async () => {
    try {
      // JSONPlaceHolderのAPIからユーザーの情報をaxiosで取得
      const response = await axios.get(url)
      const title = response.data[1].title
      setTextTitle(title)
    } catch {
      console.log("画像が取得できませんでした")
    }
  }, [])

  return { textTitle, jsonFetch } // JSONPlaceHolderの情報を返す
}
