import { ThemeContext } from '@/contexts/theme.context'
import { useContext } from 'react'

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('Not useThemeContext')
  }
  return context
}