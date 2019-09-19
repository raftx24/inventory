const WarehouseEdit = () => import('../../../pages/inventory/warehouses/Edit.vue');

export default {
    name: 'inventory.warehouses.edit',
    path: ':warehouse/edit',
    component: WarehouseEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Warehouse',
    },
};
