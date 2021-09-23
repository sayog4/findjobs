import { Spin } from 'antd'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface PrvtProps extends RouteProps {
  isAuthenticated: boolean
  isLoading: boolean
}

const PrivateRoute = ({
  isAuthenticated,
  isLoading,
  component,
  ...rest
}: PrvtProps) => {
  if (isLoading)
    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    )
  if (!isAuthenticated) return <Redirect to="/login" />
  return <Route {...rest} component={component} />
}

export default PrivateRoute
