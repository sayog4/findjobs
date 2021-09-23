import React from 'react'
import { useQuery } from 'react-query'
import { axiosInstance } from '../axios/axiosInstance'
import { queryKeys } from '../reqct-query/constants'
import { User } from '../shared/types'

interface Context {
  user: User | undefined
  isLoading: boolean
}

const AuthContext = React.createContext<Context>({
  user: undefined,
  isLoading: false,
})
AuthContext.displayName = 'AuthContext'

async function me(): Promise<User> {
  return (await axiosInstance.get(`/api/user/me`)).data
}

const AuthProvider: React.FC = ({ children }) => {
  const { data: user, isLoading } = useQuery(queryKeys.me, me)

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be called with in a AuthProvider`)
  }
  return context
}
export { AuthProvider, useAuth }
