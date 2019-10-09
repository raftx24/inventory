<template>
    <div class="has-padding-large">
        <div class="table-responsive"
             v-if="lines.length">
            <table class="table is-striped table-hover is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th class="has-text-centered">
                            #
                        </th>
                        <th class="has-text-centered">
                            {{ i18n('Position') }}
                        </th>
                        <th class="has-text-centered">
                            {{ i18n('Quantity') }}
                        </th>
                        <th class="has-text-centered">
                            {{ i18n('Action') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr :is="component(line)"
                        :key="`${line.id}-${index}`"
                        :index="index"
                        :line="line"
                        :product-id="productId"
                        :is-editing="isEditing"
                        @edit="move(line, index)"
                        @moved="updateFrom"
                        @remove="remove"
                        @cancel="cancelEdit(index)"
                        v-for="(line, index) in lines"/>
                </tbody>
            </table>
        </div>
        <div class="has-text-centered"
             v-else>
            {{ i18n('Nothing to display') }}
        </div>
    </div>
</template>

<script>
import MoveLine from './MoveLine.vue';
import Mover from './Mover.vue';

export default {
    name: 'Lines',

    components: { MoveLine, Mover },

    inject: ['errorHandler', 'i18n', 'route'],

    props: {
        productId: {
            type: [String, Number],
            required: true,
        },
    },

    data() {
        return {
            loading: false,
            isEditing: false,
            lines: [],
        };
    },

    computed: {
        totalQuantity() {
            return this.lines.filter(({ moveMode }) => !moveMode)
                .reduce((total, position) => (total + position.quantity), 0);
        },
    },

    created() {
        this.fetch();
    },

    methods: {

        move(line, index) {
            this.isEditing = true;
            this.lines.splice(index + 1, 0, this.movementFactory(line));
        },
        movementFactory(line) {
            const { quantity, id } = line;

            return {
                quantity,
                fromId: id,
                id: null,
                label: '',
                moveMode: true,
            };
        },
        updateFrom(line) {
            const { id, fromId, quantity } = line;

            const original = this.lines.find(({ id }) => id === fromId);

            original.quantity -= quantity;

            if (original.quantity === 0) {
                this.remove(fromId);
            }

            this.consolidateDuplicates(line);

            line.fromId = null;
            line.moveMode = false;
            this.isEditing = false;
        },
        remove(id) {
            this.lines.splice(this.indexOf(id), 1);
        },
        consolidateDuplicates(line) {
            const duplicate = this.lines
                .findIndex(({ id, moveMode }) => line.id === id && !moveMode);

            if (duplicate >= 0) {
                line.quantity += this.lines[duplicate].quantity;

                this.lines.splice(duplicate, 1);
            }
        },
        fetch() {
            this.loading = true;

            axios.get(this.route('inventory.positions.forProduct', this.productId))
                .then(({ data }) => {
                    this.lines = data;
                    this.loading = false;
                    this.$emit('fetched');
                }).catch(this.errorHandler);
        },
        cancelEdit(index) {
            this.isEditing = false;
            this.lines.splice(index, 1);
        },
        component(line) {
            return line.moveMode ? 'mover' : 'move-line';
        },
        indexOf(id) {
            return this.lines.findIndex(line => line.id === id);
        },
    },
};
</script>

<style lang="scss">
    .is-editing {
        background-color: #ffcca5;
    }

    .control {
      &.position {
          width: 160px;
      }

      &.quantity {
          width: 100px;
      }
    }

    .table-responsive {
        td {
            vertical-align: middle;
        }
    }
</style>
