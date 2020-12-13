import React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { RouteType } from './index';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const renderRoutes = (
  routes: Array<RouteType>
) => (routes ? (
  <Switch>
    {
      routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || i}
              to={route.redirect}
            />
          );
        }
        return (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props: any) => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        );
      })
    }
  </Switch>
) : null);

export default renderRoutes;
