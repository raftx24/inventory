import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./warehouses', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: 'warehouses',
    component: RouterView,
    meta: {
        breadcrumb: 'warehouses',
        route: 'inventory.warehouses.index',
    },
    children: routes,
};
