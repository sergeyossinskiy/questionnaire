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

            <div class="p-col-12 p-md-6" v-for="question in questions" :key="question.id">

                <Card>
                    <template #title>
                        {{ question.question }}
                    </template>
                    <template #content>

                        <div v-for="item in question.variants" :key="item.id">

                            {{ item.variant }}
                            <ProgressBar :value="result[question.id][item.id].percent" />
                            <div class="help-text align-right">{{ result[question.id][item.id].quotient }}</div>

                        </div>

                        <div v-if="result[question.id]['other_answers']">
                            <Fieldset :legend="$t('worksheet.other_answer')" :toggleable="true" :collapsed="true">
                                <div v-for="item in result[question.id]['other_answers']" :key="item">{{ item }};</div>
                            </Fieldset>
                        </div>

                    </template>
                </Card>
                
            </div>

        </div> 
        
    </Panel>

</template>

<script>
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';
import Fieldset from 'primevue/fieldset';
import { WordService } from '@/services/statistic/word.service';

export default {
    name: "Questionnaire",
    components: {
        Panel,
        Button,
        Card,
        ProgressBar,
        Fieldset
    },
    data() {
        return {
            result: {},
            worksheet_id: this.$route.params.id,
        }
    },
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        title() {
            if( this.$store.getters.stat_questionnaire )
            return this.$filters.translate( this.$store.getters.stat_questionnaire.title, this.lang);
        },
        questions() {
            if (this.$store.getters.stat_questionnaire && Object.keys(this.result).length ){
                return this.$store.getters.stat_questionnaire.questions;
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
        resultForVariant() {
            
            this.$store.getters.stat_questionnaire.questions.forEach(q => {
                q.variants.forEach(v => {
                    
                    let count = 0;
                    q.answers.find((a) => {
                        if(a.answer.includes(v.id)) {
                            count++;
                        }
                    });
                    if (!this.result[q.id]) this.result[q.id] = {};
                    this.result[q.id][v.id] = {
                        "percent": Math.round( 100/q.answers.length * count ),
                        "quotient": count + "/" + q.answers.length
                    };
                });

                if (q.type.category == 'Open'){
                    if (!this.result[q.id]) this.result[q.id] = {};

                    q.answers.forEach(a => {
                        let ans = a.answer.split(',');                        
                        let other = ans[q.variants.length == 0 ? 0 : ans.length-1];

                        
                        if( !q.variants.find(v => v.id == other) ){
                            if (!this.result[q.id]['other_answers']) this.result[q.id]['other_answers'] = [];
                            this.result[q.id]['other_answers'].push(other);
                        }
                    });
                }
            });
        }
    },
    mounted() {        
        this.resultForVariant();
    },
    wordService: null,
    created() {
        this.wordService = new WordService();
    }
};
</script>

<style scoped lang="scss">
    ::v-deep(.p-panel-header) {
        padding: 1rem 1.5rem;
    }

    ::v-deep(.p-card-title) {
        font-size: 17px;
    }

    ::v-deep( .p-progressbar-value ) {
        background: #2196f35e;
    }

    .help-text{
        font-size: 12px;
    }

    .align-right{
        text-align: right;
    }
</style>
