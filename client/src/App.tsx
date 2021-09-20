import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Routes from './pages/Routes'
import { queryClient } from './reqct-query/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
