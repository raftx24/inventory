import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./inventory', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: '/inventory',
    component: RouterView,
    meta: {
        breadcrumb: 'inventory',
    },
    children: routes,
};
