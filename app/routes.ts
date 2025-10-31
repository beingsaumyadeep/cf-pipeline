import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/api/chat", "routes/api.chat.ts"),
  ...prefix("auth", [
    layout("pages/accounts/index.tsx", [
      route("login", "pages/accounts/Login.tsx"),
      route("register", "pages/Accounts/Register.tsx"),
      route("forgot-password", "pages/accounts/ForgotPassword.tsx"),
      route("reset-password", "pages/accounts/ResetPassword.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
