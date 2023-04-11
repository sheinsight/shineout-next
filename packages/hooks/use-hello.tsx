import { isBrowser } from "@soui/utils"
import {useState, useEffect} from "react"

export default () => {
  isBrowser()
  const [text, setText]= useState('hello')
  useEffect(()=> {
    setText('hello world')
  }, [])

  return text
}