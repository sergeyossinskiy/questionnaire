<template> 

    <DataView :value="results" :layout="layout">
        <template #header>
            <div class="p-grid p-nogutter">
                <div class="p-col-12 p-md-6" style="text-align: left">
                   <h3>{{ $t('common.history') }}</h3>
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
                        <div class="p-grid">
                            <div class="p-col-12"><strong>{{ $filters.translate( slotProps.data.question.worksheet.title,  lang ) }}</strong></div>
                            <div class="p-col-12">{{ $t('common.language') + " - " + $t(`common.locales.${slotProps.data.question.worksheet.lang}`) }}</div>
                            <div class="p-col-12">
                                <i class="secondary-text">
                                    {{ $t(`results.date`) }}: {{ $filters.date( slotProps.data.created_at ) }}
                                </i>
                            </div>
                        </div>
                    </div>
                    <div>
                        {{ viewResult(slotProps.data) }}
                    </div>
                </div>
            </div>
        </template>
        <template #grid="slotProps">
            <div style="padding: .5em" class="p-col-12 p-md-3">
                <Panel :header="$filters.translate( slotProps.data.question.worksheet.title,  lang )" style="text-align: center">
                    <div class="item-detail">
                        {{ $t('common.language') + " - " + $t(`common.locales.${slotProps.data.question.worksheet.lang}`) }} -
                        <i class="secondary-text"> {{ $t(`results.date`) }}: 
                        {{ $filters.date( slotProps.data.created_at ) }} </i>
                    </div>
                    <div>
                        {{ viewResult(slotProps.data) }}
                    </div>
                </Panel>
            </div>
        </template>
    </DataView>

</template>

<script>
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import { ResultTypeService } from '@/services';

export default {
    name: "Section",
    components: {
        DataView,
        DataViewLayoutOptions,
        Dropdown,
        Panel,
        Button
    },
    data() {
        return {        
            layout: 'list',
        }
    },
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        results() {
            if (this.$store.getters.results_for_user) {
                return this.$store.getters.results_for_user;
            }            
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
        viewResult(data) {
            if (data.result == null) return '';

            return this.resultTypeService.convert(
                                data.result.score,
                                data.question.worksheet.questions.length,
                                data.question.worksheet.result_type_id,
                                this.$store.getters.results_types,
                            );
        }
    },
    async mounted() {
        this.initLayoutDataView(window);
        window.addEventListener("resize", this._initLayoutDataView);

        let spinner = document.querySelector('.progress-spinner-wrapp');
        if (spinner) spinner.style.display = 'block';

        await this.$store.dispatch('fetchResultsForUser');
        
        if (spinner) spinner.style.display = 'none';
    },
    resultTypeService: null,
    created() {
        this.resultTypeService = new ResultTypeService(this);
    },
    
};
</script>

<style scoped lang="scss">
    h3 {
        margin: 0.5rem 0;
    }

    .secondary-text {
        font-size: 14px;
        color: #aaaaaa;
    }

    ::v-deep(.p-panel-content) {
        img {
            max-height: 64px;
        }
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
            min-width: 130px;
            width: auto;
            align-self: flex-start;
        }
    }

    @media only screen and (max-width: 767px) {
        .p-dataview-layout-options {
            display: none;
        }
    }
</style>
