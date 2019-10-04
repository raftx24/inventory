<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    v-model="params.dateInterval"
                    default="thirtyDays"
                    :title="i18n('Updated')"
                    :interval="intervals.products.updated_at"/>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="product_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            ref="filterState"/>
        <enso-table class="box is-paddingless raises-on-hover"
            ref="stocks"
            id="products"
            :intervals="intervals"
            :params="params"
            @manage-positions="productId=$event.dtRowId"
            @reset="$refs.filterState.reset()"/>
        <modal show
            v-if="productId"
            @keyup.esc="close"
            @close="close">
            <positions-manager :product-id="productId"/>
        </modal>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@enso-ui/modal/bulma';
import { EnsoTable, EnsoDateFilter } from '@enso-ui/tables/bulma';
import { FilterState } from '@enso-ui/filters/renderless';
import PositionsManager from '../../components/PositionsManager.vue';

library.add(faBoxOpen);

export default {

    components: {
        Modal,
        PositionsManager,
        EnsoTable,
        EnsoDateFilter,
        FilterState,
    },

    inject: ['i18n'],

    data() {
        return {
            apiVersion: 1,
            productId: null,
            filters: {
                products: {
                    publisher_id: null,
                },
            },
            intervals: {
                products: {
                    updated_at: {
                        min: null,
                        max: null,
                        dbDateFormat: 'Y-m-d',
                    },
                },
            },
            params: {
                mapping: false,
                supplierId: null,
                authorId: null,
                dateInterval: 'all',
            },
            authorParams: {
                is_author: true,
            },
        };
    },

    methods: {
        close() {
            this.productId = null;
            this.$refs.stocks.fetch();
        },
    },
};
</script>
