import { useState, useEffect } from 'react'

const PREFIX = 'codeeditor-'

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    } 
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}