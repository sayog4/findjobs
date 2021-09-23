import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider, useAuth } from './context/userContext'
import Routes from './pages/Routes'
import { queryClient } from './reqct-query/queryClient'

function App() {
  useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
