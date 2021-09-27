import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SearchProvider } from './context/searchContext'
import { AuthProvider, useAuth } from './context/userContext'
import Routes from './pages/Routes'
import { queryClient } from './reqct-query/queryClient'

function App() {
  useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <Routes />
          <ReactQueryDevtools />
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
