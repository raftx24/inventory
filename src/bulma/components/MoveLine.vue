<template>
    <tr>
        <td class="has-text-centered">
           {{ index + 1 }}
        </td>
        <td class="has-text-centered">
           {{ line.label }}
        </td>
        <td class="has-text-centered">
           {{ line.quantity }}
        </td>
        <td class="has-text-centered">
            <button class="button is-small is-danger"
                @click="$emit('edit')"
                v-if="!isEditing">
                <span class="icon is-small">
                    <fa icon="random"/>
                </span>
            </button>
        </td>
    </tr>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core/index.js';
import { faRandom } from '@fortawesome/free-solid-svg-icons/index.js';

library.add(faRandom);

export default {
    name: 'MoveLine',

    props: {
        line: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        isEditing: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
