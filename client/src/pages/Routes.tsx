import { Route, Switch } from 'react-router-dom'
import Home from './jobs/Home'
import Jobdetails from './jobs/Jobdetails'
import Postjob from './jobs/PostJob'
import Login from './user/Login'
import Register from './user/Register'
import Userprofile from './user/Userprofile'

function Routes() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/postjob" component={Postjob} />
        <Route exact path="/jobs/:id" component={Jobdetails} />
        <Route exact path="/profile" component={Userprofile} />
      </Switch>
    </>
  )
}

export default Routes
