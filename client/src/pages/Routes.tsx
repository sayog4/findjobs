import { Route, Switch } from 'react-router-dom'
import Home from './jobs/Home'
import Postjob from './jobs/PostJob'
import Login from './user/Login'
import Register from './user/Register'

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/postjob" component={Postjob} />
      </Switch>
    </>
  )
}

export default Routes
