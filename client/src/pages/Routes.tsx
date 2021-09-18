import { Route, Switch } from 'react-router-dom'
import Login from './user/Login'
import Register from './user/Register'

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={() => <h1>Home page</h1>} />
      </Switch>
    </>
  )
}

export default Routes
