import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./labels', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: 'labels',
    component: RouterView,
    meta: {
        breadcrumb: 'labels',
        route: 'inventory.labels.index',
    },
    children: routes,
};
