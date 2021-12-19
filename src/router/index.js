/* eslint-disable no-undef */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// We import the components this way to lazy load them.
const Home = () => import('../components/home/home.vue')
const Game = () => import('../components/game/game.vue')
const Instructions = () => import('../components/instructions/instructions.vue')
const AboutUs = () => import('../components/about/about.vue')

// The routes for the project.
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {}
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        meta: {}
    },
    {
        path: '/instructions',
        name: 'instructions',
        component: Instructions,
        meta: {}
    },
    {
        path: '/about',
        name: 'about',
        component: AboutUs,
        meta: {}
    }
]
const router = new VueRouter({ routes, mode: 'history' })

export default router
