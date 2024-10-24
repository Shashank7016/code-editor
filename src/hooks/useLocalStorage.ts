import { useState, useEffect } from 'react'

const PREFIX = 'codeeditor-'

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) {
      try {
        return JSON.parse(jsonValue)
      } catch (e) {
        console.error('Error parsing stored value:', e)
        return initialValue
      }
    }
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    } 
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}