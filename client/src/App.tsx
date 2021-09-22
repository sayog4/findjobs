import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from './context/userContext'
import Routes from './pages/Routes'
import { queryClient } from './reqct-query/queryClient'

function App() {
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
