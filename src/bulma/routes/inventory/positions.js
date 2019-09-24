import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./positions', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'positions',
    component: RouterView,
    meta: {
        breadcrumb: 'positions',
        route: 'inventory.positions.index',
    },
    children: routes,
};
