import { createContext, useContext } from 'react'
import type { AppPage, ChildId, ChildProfile } from './types'

export interface AppContextValue {
  children: Record<string, ChildProfile>
  selectedChildId: ChildId
  selectedChild: ChildProfile
  setSelectedChildId: (id: ChildId) => void
  currentPage: AppPage
  navigate: (page: AppPage) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppContext.Provider')
  }

  return context
}

export { AppContext }
