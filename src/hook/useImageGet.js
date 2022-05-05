// ポケモンAPIから画像情報を取得する部分をカスタムHook化
import axios from "axios"

// 無駄なレンダリングを防ぎ、State状態を管理する。
import { useState } from "react"
import { useCallback } from "react"

const url = "https://pokeapi.co/api/v2/pokemon/25"

export const useImageGet = () => {
  // useImageのState初期値は更新する値のオブジェクトの方に合わせる（空のオブジェクトを格納する）
  // 取得する多段オブジェクトに合わせる。
  const [apiImage, setApiImage] = useState({ data: { sprites: {} } })
  const imageFetch = useCallback(async () => {
    try {
      // // ポケモンAPIからピカチュウの情報をaxiosで取得
      const response = await axios.get(url)
      // ポケモンAPIのピカチュウ情報を格納
      setApiImage(response)
    } catch {
      console.log("画像が取得できませんでした")
    }
  }, [])

  return { apiImage, imageFetch } // ポケモンAPI取得の関数を返す
}
