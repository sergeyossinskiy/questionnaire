<template> 

    <Panel>
        
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            <span>{{ $t('common.statistic') + " - " + title }}</span>
        </template>

        <template #icons>
           <Button icon="pi pi-file" label="Word" class="p-button-raised" @click="exportToWord"/>
        </template>
        
        <div class="p-grid p-px-3 p-px-md-5 p-mb-5">

            <DataTable :value="results">
                <Column header="Status">
                    <template #body="slotProps">
                        <span>{{ slotProps.data.user.lastname + ' ' + slotProps.data.user.firstname + ' ' + slotProps.data.user.patronymic}}</span>
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <span>{{ slotProps.data.created_at }}</span>
                    </template>
                </Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <span>{{ this.result_views[slotProps.data.session_id] }}</span>
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
import { ResultTypeService } from '@/services';
import { WordService } from '@/services/statistic/word.service';

export default {
    name: "Test",
    components: {
        Panel,
        Button,
        DataTable,
        Column
    },
    data() {
        return {
            worksheet_id: this.$route.params.id,
            result_views: {}
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
            if ( this.$store.getters.results && Object.keys(this.result_views).length ){
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
        viewResult(score) {
            this.$store.getters.results.forEach(item => {

                this.resultTypeService.format(
                        score,
                        this.$store.getters.stat_questionnaire.questions.length,
                        this.$store.getters.stat_questionnaire.result_type_id
                ).then(res => {
                    this.result_views[item.session_id] = res;
                });

            });
        }
    },
    async mounted() {  
        spinner.spin();
        await this.$store.dispatch('fetchResults', this.worksheet_id);
        spinner.stop();

        console.log(this.result_views);
        //console.log( this.$store.getters.results );
    },
    resultTypeService: null,
    created() {
        this.resultTypeService = new ResultTypeService(this);
    }
};
</script>

<style scoped lang="scss">
    ::v-deep(.p-panel-header) {
        padding: 1rem 1.5rem;
    }
</style>
