import Vue from "vue";
import VueRouter from "vue-router";
import { jwtDecode } from "jwt-decode";

Vue.use(VueRouter);

import Index from "../components/Index.vue";
import Login from "../components/Login.vue";
import RegisterClient from "../components/RegisterClient.vue";
import LandingClient from "../components/client/LandingClient.vue";
import LandingAdmin from "../components/admin/LandingAdmin.vue";
import LandingWorker from "../components/worker/LandingWorker.vue";
import Servicios from "../components/client/Servicios.vue";
import ServicePackages from "../components/client/ServicePackages.vue";
import CrudServicios from "../components/admin/crudservices/CrudServicios.vue";
import CrudAdmins from "../components/admin/crudadmins/CrudAdmins.vue";
import CrudPaquetes from "../components/admin/crudpackages/CrudPaquetes.vue";
import CrudTrabajadores from "../components/admin/crudworkers/CrudTrabajadores.vue";
import CrudCombos from "../components/admin/crudcombos/CrudCombos.vue";
import CrudSolicitudes from "../components/admin/crudorders/CrudSolicitudes.vue";
import SolicitudesWorker from "../components/worker/SolicitudesWorker.vue";
import PackageInfo from "../components/client/orders/PackageInfo.vue";
import VistaToken from "../components/VistaToken.vue";
import AdminProfile from "../components/admin/profileadmin/AdminProfile.vue";
import NotFoundPage from "../components/NotFoundPage.vue";
import AdminConfirmAccount from "../components/admin/crudadmins/AdminConfirmAccount.vue";
import WorkerConfirmAccount from "../components/admin/crudworkers/WorkerConfirmAccount.vue";
import SuccessView from "../components/client/orders/SuccessView.vue";
import UserAllPackages from "../components/client/UserAllPackages.vue";
import UserAllCombos from "../components/client/UserAllCombos.vue";
import ComboInfo from "../components/client/ordersCombos/ComboInfo.vue";
import WorkerProfile from "../components/worker/profileworker/WorkerProfile.vue";
import UserProfile from "../components/client/profileuser/UserProfile.vue";
import ClientOrders from "../components/client/orders/ClientOrders.vue";
import SeeReviews from "../components/SeeReviews.vue";
import MyReviews from "../components/client/MyReviews.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Index,
  },
  {
    name: "signup",
    path: "/signup",
    component: RegisterClient,
  },
  {
    name: "reviews",
    path: "/reviews",
    component: SeeReviews,
  },
  {
    name: "not-found",
    path: "/not-found",
    component: NotFoundPage,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "token-confirmation",
    path: "/token-confirmation",
    component: VistaToken,
  },
  {
    name: "client-home",
    path: "/client-home",
    component: LandingClient,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "my-reviews",
    path: "/my-reviews",
    component: MyReviews,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "administrator-home",
    path: "/administrator-home",
    component: LandingAdmin,
    meta: { role: "ADMIN" },
  },
  {
    name: "worker-home",
    path: "/worker-home",
    component: LandingWorker,
    meta: { role: "WORKER" },
  },
  {
    name: "worker-profile",
    path: "/worker-profile",
    component: WorkerProfile,
    meta: { role: "WORKER" },
  },
  {
    name: "admin-services",
    path: "/admin-services",
    component: CrudServicios,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-administrators",
    path: "/admin-administrators",
    component: CrudAdmins,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-confirm-admin-account",
    path: "/admin-confirm-admin-account",
    component: AdminConfirmAccount,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-workers",
    path: "/admin-workers",
    component: CrudTrabajadores,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-confirm-worker-account",
    path: "/admin-confirm-worker-account",
    component: WorkerConfirmAccount,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-packages",
    path: "/admin-packages",
    component: CrudPaquetes,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-combos",
    path: "/admin-combos",
    component: CrudCombos,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-orders",
    path: "/admin-orders",
    component: CrudSolicitudes,
    meta: { role: "ADMIN" },
  },
  {
    name: "admin-profile",
    path: "/admin-profile",
    component: AdminProfile,
    meta: { role: "ADMIN" },
  },
  {
    name: "user-services",
    path: "/user-services",
    component: Servicios,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "my-orders",
    path: "/my-orders",
    component: ClientOrders,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-packages",
    path: "/user-packages",
    component: UserAllPackages,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-combos",
    path: "/user-combos",
    component: UserAllCombos,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-service-packages",
    path: "/user-service-packages",
    component: ServicePackages,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "user-profile",
    path: "/user-profile",
    component: UserProfile,
    meta: { role: "COMMON_USER" },
  },
  {
    name: "orders-list",
    path: "/orders-list",
    component: SolicitudesWorker,
    meta: { role: "WORKER" },
  },
  {
    name: "user-package-info",
    path: "/user-package-info",
    component: PackageInfo,
    meta: { role: "COMMON_USER" },
    beforeEnter: (to, from, next) => {
      if (!to.query.packageId) {
        next({ path: "/not-found" });
      } else {
        next();
      }
    },
  },
  {
    name: "user-combo-info",
    path: "/user-combo-info",
    component: ComboInfo,
    meta: { role: "COMMON_USER" },
    beforeEnter: (to, from, next) => {
      if (!to.query.comboId) {
        next({ path: "/not-found" });
      } else {
        next();
      }
    },
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessView,
    beforeEnter: (to, from, next) => {
      if (to.query.session_id) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/login",
    "/",
    "/signup",
    "/unauthorized",
    "/token-confirmation",
    "/not-found",
    "/reviews",
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (to.path === "/login" && loggedIn) {
    const decoded = jwtDecode(loggedIn);
    const rol = decoded.roles[0].authority;
    if (rol === "ADMIN") {
      return next("/administrator-home");
    } else if (rol === "COMMON_USER") {
      return next("/client-home");
    } else {
      return next("/worker-home");
    }
  } else if (to.path === "/" && loggedIn) {
    const decoded = jwtDecode(loggedIn);
    const rol = decoded.roles[0].authority;
    if (rol === "ADMIN") {
      return next("/administrator-home");
    } else if (rol === "COMMON_USER") {
      return next("/client-home");
    } else {
      return next("/worker-home");
    }
  }

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  if (loggedIn) {
    try {
      const decoded = jwtDecode(loggedIn);
      const roles = decoded.roles.map((r) => r.authority);
      if (to.meta.role && !roles.includes(to.meta.role)) {
        return next("/unauthorized");
      }
    } catch (error) {
      console.error("Error decodificando el token: ", error);
      localStorage.removeItem("token");
      return next("/login");
    }
  }
  next();
});

export default router;
