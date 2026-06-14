import { useEffect, useState } from 'react'
import { AppContext } from './appContext'
import { Layout } from './components/Layout'
import { children } from './data'
import { DashboardPage } from './pages/DashboardPage'
import { LearnPage } from './pages/LearnPage'
import { ReportsPage } from './pages/ReportsPage'
import { SciencePage } from './pages/SciencePage'
import type { AppContextValue } from './appContext'
import type { AppPage, ChildId } from './types'

const storageKey = 'mindbridge.selectedChild'

function getPageFromPathname(pathname: string): AppPage {
  switch (pathname) {
    case '/learn':
      return 'learn'
    case '/science':
      return 'science'
    case '/reports':
      return 'reports'
    default:
      return 'overview'
  }
}

function getPathFromPage(page: AppPage) {
  switch (page) {
    case 'learn':
      return '/learn'
    case 'science':
      return '/science'
    case 'reports':
      return '/reports'
    default:
      return '/'
  }
}

function App() {
  const [selectedChildId, setSelectedChildId] = useState<ChildId>(() => {
    if (typeof window === 'undefined') {
      return 'james'
    }

    const stored = window.localStorage.getItem(storageKey)
    if (stored && stored in children) {
      return stored as ChildId
    }

    return 'james'
  })
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window === 'undefined') {
      return 'overview'
    }

    return getPageFromPathname(window.location.pathname)
  })

  useEffect(() => {
    window.localStorage.setItem(storageKey, selectedChildId)
    document.title = `MindBridge · ${children[selectedChildId].name}`
  }, [selectedChildId])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPathname(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (page: AppPage) => {
    const nextPath = getPathFromPage(page)

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }

    setCurrentPage(page)
  }

  const context: AppContextValue = {
    children,
    selectedChildId,
    selectedChild: children[selectedChildId],
    setSelectedChildId,
    currentPage,
    navigate,
  }

  const pageContent = (() => {
    switch (currentPage) {
      case 'learn':
        return <LearnPage />
      case 'science':
        return <SciencePage />
      case 'reports':
        return <ReportsPage />
      default:
        return <DashboardPage />
    }
  })()

  return (
    <AppContext.Provider value={context}>
      <Layout>{pageContent}</Layout>
    </AppContext.Provider>
  )
}

export default App
