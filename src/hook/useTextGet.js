// ポケモンAPIから画像情報を取得する部分をカスタムHook化
import axios from "axios"

// 無駄なレンダリングを防ぎ、State状態を管理する。
import { useState } from "react"
import { useCallback } from "react"

const url = "https://jsonplaceholder.typicode.com/todos"

export const useTextGet = () => {
  // useJsonのState初期値はnullとする。
  const [apiJson, setApiJson] = useState(null)
  const jsonFetch = useCallback(async () => {
    try {
      // JSONPlaceHolderのAPIからユーザーの情報をaxiosで取得
      const response = await axios.get(url)
      setApiJson(response)
    } catch {
      console.log("画像が取得できませんでした")
    }
  }, [])

  return { apiJson, jsonFetch } // JSONPlaceHolderの情報を返す
}
