import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./inventory', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: '/inventory',
    component: RouterView,
    meta: {
        breadcrumb: 'inventory',
    },
    children: routes,
};
