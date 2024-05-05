import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import VueRouter from 'vue-router';
//import { component } from "vue/types/umd";
//import { component } from "vue/types/umd";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Notifications.vue");
const Icons = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const Login = () => import(/* webpackChunkName: "common" */ "@/pages/Login.vue");

const Chapitre = () => import(/* webpackChunkName: "common" */ "@/pages/crud/Chapitre.vue");

const AjouterLecon = () => import(/* webpackChunkName: "common" */"@/pages/crud/AjouterLecon.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
      {
        path: "crud/chapitre",
        name: "matieres",
        component: Chapitre
      },
      {
        path: "crud/ajouterLecon",
        name: "ajouterLecon",
        component: AjouterLecon
      }
    ],
  },
  { 
    path: "/login", component: Login
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

const router = new VueRouter({
  mode: 'history',
//  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  // Liste des routes protégées
  const protectedRoutes = ['/dashboard', '/profile', '/notifications', '/icons', '/maps', '/typography', '/table-list'];

  // Vérifie si l'utilisateur tente d'accéder à une route protégée
  if (protectedRoutes.includes(to.path) &&!isAuthenticated()) {
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    next({ name: 'login' });
  } else if (to.path === '/login' && isAuthenticated()) {
    // Si l'utilisateur tente d'accéder à la page de connexion alors qu'il est déjà authentifié,
    // redirigez-le vers le tableau de bord.
    next({ name: 'dashboard' });
  } else {
    // Pour toutes les autres routes, procédez normalement.
    next();
  }
});

export default routes;
