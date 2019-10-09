<template>
    <card header
        refresh
        icon="box-open"
        :title="i18n('Position Manager')"
        :badge="totalQuantity"
        :overlay="loading"
        @refresh="fetch">
        <card-header class="has-background-light">
            <template v-slot:title>
                <span class="icon is-small has-margin-right-small">
                    <fa icon="box-open"/>
                </span>
                {{ i18n('Position Manager') }}
            </template>
            <template v-slot:controls>
                <card-refresh @refresh="fetch"/>
                <card-badge :label="totalQuantity"
                    type="is-bold has-background-warning"/>
                <card-collapse/>
            </template>
        </card-header>
        <card-content class="is-paddingless">
            <lines class="animated fadeIn"
                :product-id="productId"
                @hook:mounted="ready = true"
                ref="lines"/>
        </card-content>
    </card>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import {
    Card, CardHeader, CardRefresh, CardCollapse, CardBadge, CardContent,
} from '@enso-ui/card/bulma';
import Lines from './Lines.vue';

library.add(faBoxOpen);

export default {
    name: 'PositionsManager',

    components: {
        Lines,
        Card,
        CardHeader,
        CardRefresh,
        CardCollapse,
        CardBadge,
        CardContent,
    },

    inject: ['errorHandler', 'i18n'],

    props: {
        productId: {
            type: [String, Number],
            required: true,
        },
    },

    data: () => ({
        ready: false,
    }),

    computed: {
        loading() {
            return this.ready && this.$refs.lines.loading;
        },
        totalQuantity() {
            return this.ready ? this.$refs.lines.totalQuantity : 0;
        },
    },

    watch: {
        totalQuantity(quantity) {
            this.$emit('update', quantity);
        },
    },

    methods: {
        fetch() {
            if (this.$refs.lines) {
                this.$refs.lines.fetch();
            }
        },
    },

};
</script>
