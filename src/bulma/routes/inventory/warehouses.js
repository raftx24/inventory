import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./warehouses', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'warehouses',
    component: RouterView,
    meta: {
        breadcrumb: 'warehouses',
        route: 'inventory.warehouses.index',
    },
    children: routes,
};
