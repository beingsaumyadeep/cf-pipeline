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
    layout("pages/Accounts/index.tsx", [
      route("login", "pages/Accounts/Login.tsx"),
      route("register", "pages/Accounts/Register.tsx"),
      route("forgot-password", "pages/Accounts/ForgotPassword.tsx"),
      route("reset-password", "pages/Accounts/ResetPassword.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
