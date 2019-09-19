const PositionEdit = () => import('../../../pages/inventory/positions/Edit.vue');

export default {
    name: 'inventory.positions.edit',
    path: ':position/edit',
    component: PositionEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Position',
    },
};
