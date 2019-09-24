<template>
    <div>
        <enso-table class="box is-paddingless raises-on-hover"
            id="warehouses"
            @import="openUploader"/>
        <import-uploader v-show="false"
            :path="route('import.store')"
            :params="uploaderParams"
            ref="uploader"/>
    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';
import ImportUploader from '@enso-ui/data-import/src/bulma/pages/dataImport/components/ImportUploader.vue';

library.add(faFileImport);

export default {
    name: 'Index',

    components: { EnsoTable, ImportUploader },

    inject: ['route'],

    data: () => ({
        warehouse: null,
    }),

    computed: {
        uploaderParams() {
            return {
                type: 'positions',
                warehouse: this.warehouse,
            };
        },
    },

    methods: {
        openUploader(event) {
            this.warehouse = event.dtRowId;
            this.$refs.uploader.browseFiles();
        },
    },
};
</script>
