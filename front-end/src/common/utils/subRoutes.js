import { Route } from "react-router-dom/cjs/react-router-dom.min";

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export default RouteWithSubRoutes;
