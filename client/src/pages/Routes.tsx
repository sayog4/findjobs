import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import { useAuth } from '../context/userContext'
import Appliedjobs from './jobs/Appliedjobs'
import Editjob from './jobs/Editjob'
import Home from './jobs/Home'
import Jobdetails from './jobs/Jobdetails'
import Postedjob from './jobs/Postedjob'
import Postjob from './jobs/PostJob'
import Activate from './user/Activate'
import Login from './user/Login'
import Register from './user/Register'
import Userinfo from './user/Userinfo'
import Userprofile from './user/Userprofile'

function Routes() {
  const { user, isLoading } = useAuth()

  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/auth/account/activate/:token"
          component={Activate}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          path="/"
          exact
          component={Home}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          exact
          path="/postjob"
          component={Postjob}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          exact
          path="/appliedjobs"
          component={Appliedjobs}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          exact
          path="/postedjobs"
          component={Postedjob}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          exact
          path="/jobs/:id"
          component={Jobdetails}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          exact
          path="/users/:id"
          component={Userinfo}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          exact
          path="/editjob/:id"
          component={Editjob}
        />
        <PrivateRoute
          isLoading={isLoading}
          isAuthenticated={!!user}
          exact
          path="/profile"
          component={Userprofile}
        />
      </Switch>
    </>
  )
}

export default Routes
