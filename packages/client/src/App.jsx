import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { DashboardPage } from './components/Dashboard'
import {LoginPage,} from './components/loginForm'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
            <li>
              <Link to="/home">Home Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/home">
              <DashboardPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


export function useProvideAuth() {
  const [user, setUser] = useState(null);
  
  const signin = cb => {
    return fakeAuth.signin(() => {
       setUser("user")
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}


/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext2 = React.createContext()

function ProvideAuth({ children }) {
  const auth =  useProvideAuth();
  return (
    <authContext2.Provider value={auth}>
      {children}
    </authContext2.Provider>
  );
}

export function useAuth() {
return React.useContext(authContext2)
}





// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
      auth.user  ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
