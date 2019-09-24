import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./labels', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'labels',
    component: RouterView,
    meta: {
        breadcrumb: 'labels',
        route: 'inventory.labels.index',
    },
    children: routes,
};
