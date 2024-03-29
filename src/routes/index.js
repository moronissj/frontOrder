import Vue from "vue";
import VueRouter from "vue-router";
import { jwtDecode } from "jwt-decode";

Vue.use(VueRouter);

import Index from "../components/Index.vue";
import Login from "../components/Login.vue";
import RegisterClient from "../components/RegisterClient.vue";
import RegisterAdmin from "../components/admin/RegisterAdmin.vue";
import RegisterTrabajador from "../components/admin/RegisterTrabajador.vue";
import RegisterPaquete from "../components/admin/RegisterPaquete.vue";
import LandingClient from "../components/client/LandingClient.vue";
import LandingAdmin from "../components/admin/LandingAdmin.vue";
import LandingWorker from "../components/worker/LandingWorker.vue";
import Servicios from "../components/client/Servicios.vue";
import CrudServicios from "../components/admin/crudservices/CrudServicios.vue";
import CrudAdmins from "../components/admin/CrudAdmins.vue";
import CrudPaquetes from "../components/admin/CrudPaquetes.vue";
import CrudTrabajadores from "../components/admin/CrudTrabajadores.vue";
import CrudCombos from "../components/admin/CrudCombos.vue";
import CrudSolicitudes from "../components/admin/CrudSolicitudes.vue";
import HistorialOrdenes from "../components/client/HistorialOrdenes.vue";
import RegisterService from "../components/admin/RegisterService.vue";
import SolicitudesWorker from "../components/worker/SolicitudesWorker.vue";
import LandingS from "../components/LandingS.vue";
import Taquizas from "../components/client/Taquizas.vue";
import Comida from "../components/client/Comida.vue";
import Transporte from "../components/client/Transporte.vue";
import Utileria from "../components/client/Utileria.vue";
import UpdateClient from "../components/client/UpdateClient.vue";
import UpdateTrabajador from "../components/worker/UpdateTrabajador.vue";
import UpdateAdmin from "../components/admin/UpdateAdmin.vue";
import DetallesPaquete from "../components/client/DetallesPaquete.vue";
import VistaToken from "../components/VistaToken.vue";

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
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "confirm-account",
    path: "/comfirm-account",
    component: VistaToken,
  },
  {
    name: "client-home",
    path: "/client-home",
    component: LandingClient,
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
    name: "admin-workers",
    path: "/admin-workers",
    component: CrudTrabajadores,
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
  //rutas asociadas a los componentes
  // {
  //   path: "/",
  //   component: {
  //     render(c) {
  //       return c("router-view");
  //     },
  //   },
  //   //los componentes que se renderizan en router vue
  //   children: [
  //     {
  //       path: "/index",
  //       name: "index",
  //       component: () => import("../components/Index.vue"),
  //     },
  //     {
  //       path: "/login",
  //       name: "login",
  //       component: () => import("../components/Login.vue"),
  //     },
  //     {
  //       path: "/register",
  //       name: "register",
  //       component: () => import("../components/RegisterClient.vue"),
  //     },

  //     {
  //       path: "/register-admin",
  //       name: "register-admin",
  //       component: () => import("../components/admin/RegisterAdmin.vue"),
  //     },

  //     {
  //       path: "/register-trabajador",
  //       name: "register-trabajador",
  //       component: () => import("../components/admin/RegisterTrabajador.vue"),
  //     },

  //     {
  //       path: "/register-paquete",
  //       name: "register-paquete",
  //       component: () => import("../components/admin/RegisterPaquete.vue"),
  //     },

  //     {
  //       path: "/landing",
  //       name: "landing",
  //       component: () => import("../components/client/LandingClient.vue"),
  //     },

  //     {
  //       path: "/landingAdmin",
  //       name: "landingAdmin",
  //       component: () => import("../components/admin/LandingAdmin.vue"),
  //     },

  //     {
  //       path: "/landingTrabajador",
  //       name: "landingTrabajador",
  //       component: () => import("../components/worker/LandingWorker.vue"),
  //     },

  //     {
  //       path: "/servicios",
  //       name: "servicios",
  //       component: () => import("../components/client/Servicios.vue"),
  //     },

  //     {
  //       path: "/admin-servicios",
  //       name: "admin-servicios",
  //       component: () => import("../components/admin/CrudServicios.vue"),
  //     },

  //     {
  //       path: "/admin-admins",
  //       name: "admin-admins",
  //       component: () => import("../components/admin/CrudAdmins.vue"),
  //     },

  //     {
  //       path: "/admin-paquetes",
  //       name: "admin-paquetes",
  //       component: () => import("../components/admin/CrudPaquetes.vue"),
  //     },

  //     {
  //       path: "/admin-trabajadores",
  //       name: "admin-trabajadores",
  //       component: () => import("../components/admin/CrudTrabajadores.vue"),
  //     },

  //     {
  //       path: "/admin-solicitudes",
  //       name: "admin-solicitudes",
  //       component: () => import("../components/admin/CrudSolicitudes.vue"),
  //     },

  //     {
  //       path: "/historial",
  //       name: "historial",
  //       component: () => import("../components/client/HistorialOrdenes.vue"),
  //     },

  //     {
  //       path: "/register-service",
  //       name: "register-service",
  //       component: () => import("../components/admin/RegisterService.vue"),
  //     },

  //     {
  //       path: "/solicitudes-trabajador",
  //       name: "solicitudes-trabajador",
  //       component: () => import("../components/worker/SolicitudesWorker.vue"),
  //     },

  //     {
  //       path: "/landings",
  //       name: "landings",
  //       component: () => import("../components/LandingS.vue"),
  //     },

  //     {
  //       path: "/taquizas",
  //       name: "taquizas",
  //       component: () => import("../components/client/Taquizas.vue"),
  //     },

  //     {
  //       path: "/comida",
  //       name: "comida",
  //       component: () => import("../components/client/Comida.vue"),
  //     },

  //     {
  //       path: "/transporte",
  //       name: "transporte",
  //       component: () => import("../components/client/Transporte.vue"),
  //     },

  //     {
  //       path: "/utileria",
  //       name: "utileria",
  //       component: () => import("../components/client/Utileria.vue"),
  //     },

  //     {
  //       path: "/cuenta-cliente",
  //       name: "cuenta-cliente",
  //       component: () => import("../components/client/UpdateClient.vue"),
  //     },

  //     {
  //       path: "/taquizas",
  //       name: "taquizas",
  //       component: () => import("../components/client/Taquizas.vue"),
  //     },

  //     {
  //       path: "/cuenta-trabajador",
  //       name: "cuenta-trabajador",
  //       component: () => import("../components/worker/UpdateTrabajador.vue"),
  //     },

  //     {
  //       path: "/cuenta-admin",
  //       name: "cuenta-admin",
  //       component: () => import("../components/admin/UpdateAdmin.vue"),
  //     },
  //     {
  //       path: "/detalles-paquete",
  //       name: "detalles-paquete",
  //       component: () => import("../components/client/DetallesPaquete.vue"),
  //     },
  //     {
  //       path: "/token",
  //       name: "token",
  //       component: () => import("../components/VistaToken.vue"),
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/", "/signup", "/unauthorized"];
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
