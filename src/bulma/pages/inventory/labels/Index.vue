<template>
    <div class="wrapper">
        <div class="columns is-centered no-print">
            <div class="column is-three-quarters-desktop is-full-touch">
                <div class="box has-background-light raises-on-hover">
                    <div class="columns">
                        <div class="column">
                            <enso-select v-model="filters.warehouse_id"
                                :placeholder="i18n('Warehouse')"
                                source="inventory.warehouses.options"/>
                        </div>
                        <div class="column">
                            <enso-select v-model="filters.row"
                                :placeholder="i18n('Row')"
                                source="inventory.labels.options"
                                track-by="row"
                                label="row"
                                :params="rowParams"/>
                        </div>
                        <div class="column">
                            <enso-select v-model="filters.shelf"
                                :placeholder="i18n('Shelf')"
                                source="inventory.labels.options"
                                track-by="shelf"
                                label="shelf"
                                :params="shelfParams"/>
                        </div>
                        <div class="column">
                            <enso-select v-model="filters.position"
                                :placeholder="i18n('Position')"
                                source="inventory.labels.options"
                                label="position"
                                track-by="position"
                                :params="positionParams"/>
                        </div>
                        <div class="column is-narrow">
                            <button :class="['button', 'pull-right', {'is-loading': loading}]"
                                @click="fetch">
                                {{ i18n('Generate') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="printable">
            <div class="chunk"
                 v-for="(chunk, index) in chunks"
                 :key="index">
                <div class="columns is-multiline is-variable is-1">
                    <div class="column is-3"
                         v-for="(item, idx) in chunk"
                         :key="item.id">
                        <div class="box barcode-box has-text-centered">
                            <svg class="item-barcode dotted-border"
                                 :data-value="item.label"/>
                            <div class="has-padding-top-large">
                                <a href="#">
                                <span class="icon is-small">
                                    <fa icon="hashtag" size="xs"/>
                                </span>
                                    {{ index * 20 + idx + 1 }} / {{ positions.length }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-break"/>
            </div>
        </div>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { EnsoSelect } from '@enso-ui/select/bulma';

library.add(faHashtag);

export default {
    name: 'Index',

    components: { EnsoSelect },

    inject: ['i18n', 'errorHandler', 'route'],

    data: () => ({
        filters: {
            warehouse_id: null,
            row: null,
            shelf: null,
            position: null,
        },
        positions: [],
        loading: false,
    }),

    computed: {
        chunks() {
            let current = 0;
            const chunks = [[]];

            this.positions.forEach((position) => {
                if (chunks[current].length === 20) {
                    current++;
                    chunks.push([]);
                }

                chunks[current].push(position);
            });

            return chunks;
        },
        rowParams() {
            return {
                attribute: 'row',
                warehouse_id: this.filters.warehouse_id,
            };
        },
        shelfParams() {
            return {
                attribute: 'shelf',
                warehouse_id: this.filters.warehouse_id,
                row: this.filters.row,
            };
        },
        positionParams() {
            return {
                attribute: 'position',
                warehouse_id: this.filters.warehouse_id,
                row: this.filters.row,
                shelf: this.filters.shelf,
            };
        },
    },

    methods: {
        fetch() {
            this.loading = true;

            axios.get(this.route('inventory.labels.index'), { params: { params: this.filters } })
                .then(({ data }) => {
                    this.positions = data;
                    this.loading = false;
                }).then(() => {
                    try {
                        const options = { width: 1.3, height: 60 };
                        JsBarcode('.item-barcode').options(options).init();
                    } catch (err) {
                        console.log('Error when using JsBarcode: ', err.message);
                    }
                }).catch(this.errorHandler);
        },
    },
};
</script>


<style lang="scss">
    .box.barcode-box {
        background-color: rgba(0, 148, 133, 0.10);
        padding-left: 0;
        padding-right: 0;
    }

    @media print {

        .app-main > *:not(.main-content) {
            display:none;
        }

        .main-content > *:not(.page-content) {
            display:none;
        }

        .page-content .level {
            display:none;
        }

        .wrapper > .no-print {
            display:none;
        }

        .printable {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0 !important;
        }

        .page-break {
            break-after: always;
        }

        .box.barcode-box {
            box-shadow: none;
            border-top: none;
            background-color: transparent;
            page-break-inside: avoid;
            -webkit-column-break-inside: avoid;
            break-inside: avoid;
        }

        .dotted-border {
            border-style: dotted;
            border-width: thin;
        }

        .main-content.is-collapsed {
            margin: 0 !important;
        }

        .main-content.is-expanded {
            margin: 0 !important;
        }
    }
</style>
