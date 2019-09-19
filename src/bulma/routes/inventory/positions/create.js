const PositionCreate = () => import('../../../pages/inventory/positions/Create.vue');

export default {
    name: 'inventory.positions.create',
    path: 'create',
    component: PositionCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Position',
    },
};
