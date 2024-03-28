import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  //la ruta base
  {
    path: "/",
    redirect: "/index",
  },
  //rutas asociadas a los componentes
  {
    path: "/",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    //los componentes que se renderizan en router vue
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../components/Index.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../components/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../components/RegisterClient.vue"),
      },

      {
        path: "/register-admin",
        name: "register-admin",
        component: () => import("../components/admin/RegisterAdmin.vue"),
      },

      {
        path: "/register-trabajador",
        name: "register-trabajador",
        component: () => import("../components/admin/RegisterTrabajador.vue"),
      },

      {
        path: "/register-paquete",
        name: "register-paquete",
        component: () => import("../components/admin/RegisterPaquete.vue"),
      },

      {
        path: "/landing",
        name: "landing",
        component: () => import("../components/client/LandingClient.vue"),
      },

      {
        path: "/landingAdmin",
        name: "landingAdmin",
        component: () => import("../components/admin/LandingAdmin.vue"),
      },

      {
        path: "/landingTrabajador",
        name: "landingTrabajador",
        component: () => import("../components/worker/LandingWorker.vue"),
      },

      {
        path: "/servicios",
        name: "servicios",
        component: () => import("../components/client/Servicios.vue"),
      },

      {
        path: "/admin-servicios",
        name: "admin-servicios",
        component: () => import("../components/admin/CrudServicios.vue"),
      },

      {
        path: "/admin-admins",
        name: "admin-admins",
        component: () => import("../components/admin/CrudAdmins.vue"),
      },

      {
        path: "/admin-paquetes",
        name: "admin-paquetes",
        component: () => import("../components/admin/CrudPaquetes.vue"),
      },

      {
        path: "/admin-trabajadores",
        name: "admin-trabajadores",
        component: () => import("../components/admin/CrudTrabajadores.vue"),
      },

      {
        path: "/admin-solicitudes",
        name: "admin-solicitudes",
        component: () => import("../components/admin/CrudSolicitudes.vue"),
      },

      {
        path: "/historial",
        name: "historial",
        component: () => import("../components/client/HistorialOrdenes.vue"),
      },

      {
        path: "/register-service",
        name: "register-service",
        component: () => import("../components/admin/RegisterService.vue"),
      },

      {
        path: "/solicitudes-trabajador",
        name: "solicitudes-trabajador",
        component: () => import("../components/worker/SolicitudesWorker.vue"),
      },

      {
        path: "/landings",
        name: "landings",
        component: () => import("../components/LandingS.vue"),
      },

      {
        path: "/taquizas",
        name: "taquizas",
        component: () => import("../components/client/Taquizas.vue"),
      },

      {
        path: "/comida",
        name: "comida",
        component: () => import("../components/client/Comida.vue"),
      },

      {
        path: "/transporte",
        name: "transporte",
        component: () => import("../components/client/Transporte.vue"),
      },

      {
        path: "/utileria",
        name: "utileria",
        component: () => import("../components/client/Utileria.vue"),
      },

      {
        path: "/cuenta-cliente",
        name: "cuenta-cliente",
        component: () => import("../components/client/UpdateClient.vue"),
      },

      {
        path: "/taquizas",
        name: "taquizas",
        component: () => import("../components/client/Taquizas.vue"),
      },

      {
        path: "/cuenta-trabajador",
        name: "cuenta-trabajador",
        component: () => import("../components/worker/UpdateTrabajador.vue"),
      },

      {
        path: "/cuenta-admin",
        name: "cuenta-admin",
        component: () => import("../components/admin/UpdateAdmin.vue"),
      },
      {
        path: "/detalles-paquete",
        name: "detalles-paquete",
        component: () => import("../components/client/DetallesPaquete.vue"),
      },
    ],
  },
];

const router = new VueRouter({ routes });
export default router;
