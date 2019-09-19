<template>
    <tr class="is-editor">
        <td class="has-text-centered">
            {{ index + 1 }}
        </td>
        <td class="has-text-centered">
            <div :class="['control has-icons-right position', {'is-loading': loading} ]">
                <input class="input has-text-centered"
                    :placeholder="i18n('Position')"
                    v-model="line.label"
                    v-select-on-focus
                    @change="$emit('fetch')"
                    @input="line.id = null">
                <span class="icon is-small is-right"
                    :class="line.id ? 'has-text-success' : 'has-text-danger'"
                    v-if="!loading">
                    <fa icon="check"
                        v-if="line.id"/>
                    <fa icon="times"
                        v-else/>
                </span>
                <p class="help is-danger has-text-centered"
                   v-if="errors.has('id')">
                    {{ errors.get('id') }}
                </p>
            </div>
        </td>
        <td class="has-text-centered">
            <div class="control has-icons-right quantity">
                <input class="input has-text-right"
                    v-model.number="line.quantity"
                    v-select-on-focus
                    :disabled="!line.id">
                <span class="icon is-small is-right"
                    :class="line.quantity ? 'has-text-success' : 'has-text-danger'"
                    v-if="line.id">
                    <fa icon="check"
                        v-if="line.quantity"/>
                    <fa icon="times"
                        v-else/>
                </span>
            </div>
        </td>
        <slot/>
    </tr>
</template>

<script>

import { selectOnFocus } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core/index.js';
import { faCheck, faBan, faTimes } from '@fortawesome/free-solid-svg-icons/index.js';

library.add(faCheck, faBan, faTimes);

export default {
    name: 'EditorLine',

    directives: { selectOnFocus },

    inject: ['errorHandler', 'i18n'],

    props: {
        line: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
        errors: {
            type: Object,
            required: true,
        },
    },
};
</script>
