import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recherche from '../views/Recherche.vue'
import Categories from '../views/Categories.vue'
import Messages from '../views/Messages.vue'
import CategorieMessages from '../views/CategoriesMessages'
import AjoutCategorie from "@/views/AjoutCategorie";
import UpdateCategorie from "@/views/UpdateCategorie";
import NouveauMessage from "@/views/AjoutMessage";
import UpdateMessage from "@/views/UpdateMessage";
import Connexion from "@/views/Connexion";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/ajout-categorie',
    name: 'ajout_categorie',
    component: AjoutCategorie
  },
  {
    path: '/modifier-categorie/:id',
    name: 'modifier_categorie',
    component: UpdateCategorie
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    children: [
      {
        path: ':id',
        name: 'categorie_messages',
        component: CategorieMessages
      }
    ]
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/nouveau-message',
    name: 'nouveau-message',
    component: NouveauMessage
  },
  {
    path: '/modifier-message/:id',
    name: 'modifier_message',
    component: UpdateMessage
  },
  {
    path: '/recherche',
    name: 'Recherche',
    component: Recherche
  },
  {
    path: '/a-propos',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router