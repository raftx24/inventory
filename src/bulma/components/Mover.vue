<template>
    <editor-line :loading="loading"
        :index="index"
        :line="line"
        :errors="errors"
        @fetch="fetch">
        <td class="has-text-centered">
            <button class="button is-small is-success"
                @click="move"
                v-if="valid">
                <span class="icon is-small">
                    <fa icon="check"/>
                </span>
            </button>
            <button class="button is-small is-warning"
                @click="$emit('cancel')">
                <span class="icon is-small">
                    <fa icon="ban"/>
                </span>
            </button>
        </td>
    </editor-line>
</template>

<script>
import Editor from './Editor.vue';
import EditorLine from './EditorLine.vue';

export default {
    name: 'Mover',

    components: { EditorLine },

    inject: ['route'],

    extends: Editor,

    methods: {
        move() {
            this.loading = true;

            axios.post(
                this.route('inventory.positions.move', {
                    product: this.productId,
                    from: this.line.fromId,
                    to: this.line.id,
                }), { quantity: this.line.quantity },
            ).then(() => {
                this.loading = false;
                this.$emit('moved', this.line);
            }).catch(this.errorHandler);
        },
    },
};
</script>
