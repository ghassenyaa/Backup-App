import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import AuthGuard from "./components/AuthGuard";
import SwitchGuard from "./components/SwitchGuard";
import GuestGuard from "./components/GuestGuard";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);
const routes = [
  {
    exact: true,
    path: "/404",
    component: () => <Redirect to="/" />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: "/login",
    component: lazy(() => import("./pages/Auth/LoginView")),
  },
  {
    exact: true,
    guard: SwitchGuard,
    path: "/switch",
    component: lazy(() => import("./pages/Auth/Switch")),
  },
  {
    guard: AuthGuard,
    path: "/",

    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("./pages/Home")),
      },
      {
        exact: true,
        path: "/config",
        component: lazy(() => import("./pages/InterfaceConfig")),
      },
      {
        exact: true,
        path: "/uploadfile",
        component: lazy(() => import("./pages/ProgressBar")),
      },
    ],
  },
];
export default routes;
