import Vue from 'vue'
import VueRouter from 'vue-router'
import inicio from '../views/inicio.vue'
import galeria from '../views/galeria.vue'
import texto from '../views/textoReflexivo.vue'
import detalleGaleria from '../views/detalleGaleria.vue'
import detalleGaleriaVideo from '../views/detalleGaleriaVideo.vue'
import detalleReflejo from '../views/detalleReflejo.vue'
import detalleReflejoVideo from '../views/detalleReflejoVideo.vue'


import mapa from '../views/mapa.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'inicio',
        component: inicio
    },
    {
        path: '/galeria',
        name: 'galeria',
        component: galeria
    },
    {
        path: '/detalle-galeria',
        name: 'detalleGaleria',
        component: detalleGaleria
    },
    {
        path: '/detalle-galeria-video',
        name: 'detalleGaleriaVideo',
        component: detalleGaleriaVideo
    },
    {
        path: '/detalle-reflejo',
        name: 'detalleReflejo',
        component: detalleReflejo
    },
    {
        path: '/detalle-reflejo-video',
        name: 'detalleReflejoVideo',
        component: detalleReflejoVideo
    },

    {
        path: '/mapa',
        name: 'mapa',
        component: mapa
    },

    {
        path: '/texto-reflexivo',
        name: 'texto',
        component: texto
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router