import { Route, Switch, Redirect } from 'react-router-dom'
import { useAuth } from '../context/userContext'
import Home from './jobs/Home'
import Jobdetails from './jobs/Jobdetails'
import Postjob from './jobs/PostJob'
import Login from './user/Login'
import Register from './user/Register'
import Userprofile from './user/Userprofile'

function Routes() {
  const { user } = useAuth()
  console.log(user)
  return <>{!user ? <UnAuthenticatedApp /> : <AuthenticatedApp />}</>
}
function UnAuthenticatedApp() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/login" />
      </Switch>
    </>
  )
}
function AuthenticatedApp() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/postjob" component={Postjob} />
        <Route exact path="/jobs/:id" component={Jobdetails} />
        <Route exact path="/profile" component={Userprofile} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default Routes
