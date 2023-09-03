import {createRouter, createWebHistory} from '@ionic/vue-router';

const routes = [
    {
        path: '/',
        redirect: '/home/new-session'
    },
    {
        path: '/home/',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: '',
                redirect: '/home/new-session'
            },
            {
                path: 'new-session',
                component: () => import('@/views/NewSession.vue')
            },
            {
                path: 'all-sessions',
                component: () => import('@/views/AllSessions.vue')
            },
        ]
    },
    {
        path: '/session-details/:id',
        component: () => import('@/views/SessionDetails.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
