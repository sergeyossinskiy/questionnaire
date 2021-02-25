<template> 

    <Panel>
        
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            <span>{{ $t('common.statistic') + " - " + title }}</span>
        </template>

        <template #icons>
            <div class="p-d-flex">
                <div class="search-input p-inputgroup p-mr-3">
                    <InputText v-model="searchText" :placeholder="$t('results.fullname')"/>
                    <Button :label="$t('common.search')" @click="search"/>
                </div>

            <Button icon="pi pi-file" label="Word" class="p-button-raised" @click="exportToWord"/>
            </div>
            
        </template>
        
        <div class="p-grid">

            <DataTable :value="results" :paginator="true" :lazy="true" :rows="10" 
                       :totalRecords="totalRecords"  :loading="loading" @page="onPage($event)" ref="dt" class="p-datatable-responsive">
                <Column headerStyle="width: 5rem">
                    <template #header="">
                        <div class="align_right">№</div>
                    </template>
                    <template #body="slotProps">
                        <span class="p-column-title">№</span>
                        <span class="align_right">{{ results.indexOf(slotProps.data) + 1 }}</span>
                    </template>
                </Column>
                <Column :header="$t('results.fullname')">
                    <template #body="slotProps">
                        <span class="p-column-title">{{ $t('results.fullname') }}:</span>
                        <span>{{ slotProps.data.user.lastname + ' ' + slotProps.data.user.firstname + ' ' + slotProps.data.user.patronymic}}</span>
                    </template>
                </Column>
                <Column :header="$t('results.date')" headerStyle="width: 12rem">
                    <template #body="slotProps">
                        <span class="p-column-title">{{ $t('results.date') }}:</span>
                        <span>{{ slotProps.data.created_at }}</span>
                    </template>
                </Column>
                <Column :header="$t('results.mark')" headerStyle="width: 15rem">
                    <template #body="slotProps">
                        <span class="p-column-title">{{ $t('results.mark') }}:</span>
                        <span>
                            {{ resultTypeService.convert(
                                slotProps.data.result.score,
                                $store.getters.stat_questionnaire.questions.length,
                                $store.getters.stat_questionnaire.result_type_id,
                                $store.getters.results_types,
                            ) }}
                        </span>
                    </template>
                </Column>
            </DataTable>

        </div> 
        
    </Panel>

</template>

<script>
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { ResultTypeService } from '@/services';
import { WordService } from '@/services/statistic/word.service';

export default {
    name: "Test",
    components: {
        Panel,
        Button,
        DataTable,
        Column,
        InputText
    },
    data() {
        return {
            worksheet_id: this.$route.params.id,
            result_views: {},
            loading: false,
            totalRecords: 0,
            lazyParams: {},
            totalRecords: 0,
            searching: false,
            searchText: ''
        }
    },
    watch: {
        searchText(newdata) {
            if (!newdata && this.searching) {
                this.loadLazyData();
                this.searching = false;
            }            
        }
    },
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        worksheet() {
            this.$store.getters.stat_questionnaire;
        },
        title() {
            if( this.$store.getters.stat_questionnaire )
            return this.$filters.translate( this.$store.getters.stat_questionnaire.title, this.lang);
        },
        results() {
            if ( this.$store.getters.results){
                return this.$store.getters.results;
            }
        }
    },
    methods: {
        toList() {
            this.$router.push({ path: "/statistic" });
        },
        exportToWord() {
            this.wordService.export(this);
        },
        onPage(event) {
            this.lazyParams = event;
            this.loadLazyData();
        },
        async loadLazyData() {
            this.loading = true;

            await this.$store.dispatch('fetchResults', {
                "worksheet_id": this.worksheet_id,
                "params": this.lazyParams
            });

            this.totalRecords = this.$store.getters.total_results;
            this.loading = false;
        },
        async search() {
            if (this.searchText) {
                this.searching = true;
                this.loading = true;

                await this.$store.dispatch('fetchResults', {
                    "worksheet_id": this.worksheet_id,
                    "params": {"search":this.searchText, ...this.lazyParams}
                });

                this.totalRecords = this.$store.getters.total_results;
                this.loading = false;
            }
        }

    },
    mounted() {  
        this.lazyParams = {
            first: 0,
            rows: this.$refs.dt.rows
        };

        this.loadLazyData();
    },
    resultTypeService: null,
    wordService: null,
    created() {
        this.resultTypeService = new ResultTypeService(this);
        this.wordService = new WordService();
    },
    beforeUnmount() {
        this.$store.dispatch('clearResults');
    }
};
</script>

<style scoped lang="scss">

    ::v-deep(.p-panel-header) {
        padding: 1rem 1.5rem;
    }

    ::v-deep(.p-panel-content) {
        padding: 0;
    }

    .search-input {
        max-width: 200px;
    }

    .align_right {
        display: block;
        text-align: right;
    }

    .p-datatable-responsive .p-datatable-tbody > tr > td .p-column-title {
        display: none;
    }

    @media screen and (max-width: 40em) {
        .align_right {
            display: inline;
            text-align: left;
        }

        ::v-deep(.p-datatable) {
            &.p-datatable-responsive {
                .p-datatable-thead > tr > th,
                .p-datatable-tfoot > tr > td {
                    display: none !important;
                }

                .p-datatable-tbody > tr > td {
                    text-align: left;
                    display: block;
                    width: 100%;
                    float: left;
                    clear: left;
                    border: 0 none;

                    .p-column-title {
                        padding: .4rem;
                        min-width: 30%;
                        display: inline-block;
                        margin: -.4em 1em -.4em -.4rem;
                        font-weight: bold;
                    }

                    &:last-child {
                        border-bottom: 1px solid var(--surface-d);
                    }
                }
            }
        }
    }
</style>
