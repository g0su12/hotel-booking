import AuthPage from "../../auth/AuthPage";
import LoginPage from "../../auth/Login";
import RegisterPage from "../../auth/Register";
import HomePage from "../../booking/Home";

const PAGE_ROUTES = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/auth",
    component: AuthPage,
    routes: [
      {
        path: "/auth/login",
        component: LoginPage,
      },
      {
        path: "/auth/register",
        component: RegisterPage,
      },
    ],
  },
];

export default PAGE_ROUTES;
