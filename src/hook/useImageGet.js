// ポケモンAPIから画像情報を取得する部分をカスタムHook化
import axios from "axios"

// 無駄なレンダリングを防ぎ、State状態を管理する。
import { useState } from "react"
import { useCallback } from "react"

const url = "https://pokeapi.co/api/v2/pokemon/25"

export const useImageGet = () => {
  //  ポケモンAPIからのピカチュウの画像URLをstate管理する
  const [apiPokemonfront, setApiPokemonfront] = useState("") // →前面画像のURLのstate管理
  const [apiPokemonBack, setApiPokemonBack] = useState("") // →背面画像のURLのstate管理
  const imageFetch = useCallback(async () => {
    try {
      //  ポケモンAPIからピカチュウの情報をaxiosで取得
      const response = await axios.get(url)
      //  ピカチュウの前面、背面のURLを取得
      const frontUrl = response.data.sprites.front_default
      const backUrl = response.data.sprites.back_female
      // ポケモンAPIのピカチュウ情報を格納
      setApiPokemonfront(frontUrl)
      setApiPokemonBack(backUrl)
    } catch {
      console.log("画像が取得できませんでした")
    }
  }, [])

  return { apiPokemonfront, apiPokemonBack, imageFetch } // 関数と前面、背面のURLを返す
}
