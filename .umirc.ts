import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: "",
  },
  layout: false,
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  npmClient: "pnpm",
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: "./Home",
    },
    {
      path: "/DForm",
      component: "./DForm",
    },
    {
      path: "/*",
      // component: "./404"
    },
  ],
  tailwindcss: {},
});
