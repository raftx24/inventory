const WarehouseCreate = () => import('../../../pages/inventory/warehouses/Create.vue');

export default {
    name: 'inventory.warehouses.create',
    path: 'create',
    component: WarehouseCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Warehouse',
    },
};
