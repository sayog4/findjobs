import React from 'react'

interface Context {
  search: string
  setSearchQuery: (value: string) => void
}
const SearchContext = React.createContext<Context>({
  search: '',
  setSearchQuery: () => {},
})

SearchContext.displayName = 'SearchContext'

const SearchProvider: React.FC = ({ children }) => {
  const [search, setSearch] = React.useState('')
  function setSearchQuery(value: string) {
    setSearch(value)
  }
  return (
    <SearchContext.Provider value={{ search, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

function useSearchContext() {
  const context = React.useContext(SearchContext)

  if (context === undefined)
    throw new Error(`useSearchContext must be called with in a SearchProvider`)
  return context
}

export { SearchProvider, useSearchContext }
