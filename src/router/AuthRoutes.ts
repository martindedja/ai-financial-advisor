import BlankLayout from '@/layouts/blank/BlankLayout.vue';
const AuthRoutes = {
    path: '/auth',
    component: BlankLayout,
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Landing Page',
            path: '/',
            component: () => import('@/views/pages/landingpage/index.vue')
        },
        {
            name: 'Side Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/SideLogin.vue')
        },
        {
            name: 'Side Register',
            path: '/auth/register',
            component: () => import('@/views/authentication/SideRegister.vue')
        },
        {
            name: 'Side Forgot Password',
            path: '/auth/forgot-password',
            component: () => import('@/views/authentication/SideForgotPassword.vue')
        },
        {
            name: 'Side Two Steps',
            path: '/auth/two-step',
            component: () => import('@/views/authentication/SideTwoStep.vue')
        },
        {
            name: 'Error',
            path: '/auth/404',
            component: () => import('@/views/authentication/Error.vue')
        },
        {
            name: 'Maintenance',
            path: '/auth/maintenance',
            component: () => import('@/views/authentication/Maintenance.vue')
        }
    ]
};

export default AuthRoutes;
