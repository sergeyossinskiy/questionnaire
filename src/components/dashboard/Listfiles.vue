<template>

    <DataView :value="files" :layout="layout" :paginator="true" :rows="10">
        <template #header>
            <div class="p-grid p-nogutter">
                <div class="p-col-12 p-md-6 title-operation" style="text-align: left">
                    <span>{{ $t('common.files_list') }}</span>
                </div>
                <div class="p-col-0 p-md-6" style="text-align: right">
                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </div>
        </template>
        <template #list="slotProps">
            <div class="p-col-12">
                <div class="item-details">
                    <div class="item-info">
                        <img src="@/assets/ills/test.png" alt="test"/>
                        <div class="p-grid">
                            <div class="p-col-12"><strong>{{ $filters.translate( slotProps.data.title,  lang ) }}</strong></div>
                            <div class="p-col-12">{{ $filters.translate( slotProps.data.description,  lang ) }}</div>
                            <div class="p-col-12">
                                <i class="secondary-text">
                                    {{ $t(`common.updated`) }}: {{ $filters.date( slotProps.data.updated_at ) + ", " + 
                                    $t('common.language') + " - " + $t(`common.locales.${slotProps.data.lang}`) }}
                                </i>
                            </div>
                        </div>
                    </div>
                    <Button @click="openWorksheet(slotProps.data.id)">{{ $t('common.edit') }}</Button>
                </div>
            </div>
        </template>
        <template #grid="slotProps">
            <div style="padding: .5em" class="p-col-12 p-md-3">
                <Panel :header="$filters.translate( slotProps.data.title,  lang )" style="text-align: center">
                    <img src="@/assets/ills/test.png" alt="test"/>
                    <div class="item-detail">
                        {{ $filters.translate( slotProps.data.description,  lang )  }} -
                        <i class="secondary-text"> {{ $t(`common.updated`) }}: 
                        {{ $filters.date( slotProps.data.updated_at ) }} </i>
                    </div>
                    <Button @click="openWorksheet(slotProps.data.id)">{{ $t('common.edit') }}</Button>
                </Panel>
            </div>
        </template>
    </DataView>   

</template>

<script>
import { FilesService } from '@/services';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Button from 'primevue/button';

import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';

export default {
    name: 'Listfiles',
    components: {
        DataView,
        DataViewLayoutOptions,
        Button,
        Panel,
        Dropdown
    },
    data() {
		return {
            layout: 'list'
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        files() {
            return this.filesService.getAll();
        }
    },
    methods: {
        initLayoutDataView(el) {
            if (el.innerWidth <= 767){
                this.layout = 'grid';
            }
            else{
                this.layout = 'list';
            }
        },
        _initLayoutDataView(e) {
            this.initLayoutDataView(e.currentTarget);
        },
        openWorksheet(id) {
            this.$store.commit('setOperationParams', { "worksheet_id": id });
            this.$store.commit('setOperation', 'editfile');
        }
    },
    filesService: null,
    created() {
        this.filesService = new FilesService( this.$store );
        this.filesService.loadFiles();
    },
    mounted() {
        this.initLayoutDataView(window);
        window.addEventListener("resize", this._initLayoutDataView);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    ::v-deep(.p-dataview-header){
        padding: 0.5rem 2rem 0.5rem 2rem;
    }

    ::v-deep(.p-panel-content) {
        img {
            max-height: 64px;
        }
    }

    .title-operation {
        padding-top: 0.5rem;
    }

    .secondary-text {
        font-size: 14px;
        color: #aaaaaa;
    }

    .item-details {
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;

        .item-info {
            display: flex;
            justify-content: space-around;

            div {
                margin-left: 1rem;
                margin-right: 1rem;
            }
        }

        img {
            max-height: 64px;
        }

        .p-button {
            min-width: 100px;
            width: auto;
            align-self: flex-start;
        }
    }

    @media only screen and (max-width: 767px) {
        .p-dataview-layout-options {
            display: none;
        }
    }

    @media only screen and (min-width: 767px) {
        ::v-deep(.p-grid){
            overflow: hidden;
            overflow-y: auto;
            max-height: 450px;
        }
    }

</style>
