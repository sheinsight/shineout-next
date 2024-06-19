import { useEffect, useRef, useState } from 'react'
import { usePersistFn, util } from '@sheinx/hooks'

export interface UseAutoFocusProps {
  autoFocus?: boolean
}

export type ElementType = HTMLInputElement | HTMLTextAreaElement | null

export const useAutoFocus = (props: UseAutoFocusProps) => {
  const { autoFocus } = props

  const [focus, setFocus] = useState<boolean>(false)
  const focusRef = useRef<ElementType>(null)

  useEffect(() => {
    autoFocus && focus && focusRef.current?.focus()
  }, [focus, autoFocus])

  return { focusRef, setFocus }
}

export const useAutoFocusByVisible = (props: UseAutoFocusProps) => {
  const { autoFocus } = props

  const { focusRef, setFocus } = useAutoFocus({
    autoFocus
  })

  const focusHandler = usePersistFn(async () => {
    try {
      const visible = await util.isElementVisible(focusRef)
      setFocus(visible)
    } catch (e) {
      console.error(e)
    }
  })

  useEffect(() => {
    if(!autoFocus) return
    focusHandler()
  }, [autoFocus])

  return { focusRef }
}

export default useAutoFocus