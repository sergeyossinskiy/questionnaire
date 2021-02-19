<template> 

    <template v-if="saved">
        <Card class="result">
            <template #header>
                <img alt="user header" src="../assets/ills/saved_result.png">
            </template>
            <template #title>
                {{ $t('worksheet.result') }}
            </template>
            <template #content v-if="result!=null">
                {{ $t('worksheet.your_saved_result', { result: result })}}
            </template>
            <template #footer>
                <Button icon="pi pi-home" :label="$t('common.to_home')" @click="exit" class="p-button-primary" style="margin-left: .5em" />
            </template>
        </Card>
    </template>

    <template v-if="!saved">
        <Card class="worksheet">
            <template #title>
                <div class="p-grid p-nogutter">
                    <div class="p-col-6" style="text-align: left">
                    <span>{{ $filters.translate(worksheet.title, lang) }}</span>
                    </div>
                    <div class="p-col-6" style="text-align: right">
                    
                    </div>
                </div>
            </template>

            <template #content>

                <div class="description">
                    {{ $filters.translate(worksheet.description, lang) }}
                </div>

                <Question v-for="item in worksheet.questions" :key="item.id" 
                        :it="item"
                        :onSetAnswer="onSetAnswer"
                />

            </template>

            <template #footer>
                <Button icon="pi pi-sign-out" :label="$t('worksheet.stop')" @click="exit" class="p-button-secondary"/>
                <Button icon="pi pi-check" :label="$t('worksheet.complete')" @click="done" />
            </template>
        </Card>
    </template>

</template>

<script>
import { ResultTypeService } from '@/services';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Question from "@/components/landing/Question.vue";

export default {
    name: "Worksheet",
    components: {
        Card,
        Button,
        Divider,
        Question
    },
    data() {
        return {
            worksheet_id: this.$route.params.id_worksheet,
            answers: {},
            saved: false,
            result: null
        }
    },
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        worksheet() {
            return this.$store.getters.worksheet;
        }
    },
    methods: {
        loaderSpin(){
            let spinner = document.querySelector('.p-progress-spinner-container');
            if (spinner) 
                spinner.style.display = 'block';
        },
        loaderStop(){
            let spinner = document.querySelector('.p-progress-spinner-container');
            if (spinner) 
                spinner.style.display = 'none';
        },
        exit() {
            this.$router.push({ path: `/section/${this.worksheet.section.name}`});
            this.$store.dispatch('clearWorksheet'); 
        },
        onSetAnswer(data) {
            let anw = Array.isArray( data.answer.checked ) ? Array.from( data.answer.checked ) : (data.answer.checked ? [data.answer.checked] : []);
            if (data.answer.other) anw.push( data.answer.other ); 
            
            this.answers[data.question_id] = anw;
        },
        done() {
            const number_question = Object.keys( this.worksheet.questions ).length;
            let number_answers = Object.keys( this.answers ).length;
            if( number_question != number_answers ){
                this.$toast.add({   
                                    severity:'warn', 
                                    summary: this.$t('worksheet.answer_all_questions'), 
                                    detail: this.$t('worksheet.number_of_answers') + ": " + number_answers + "/" + number_question, 
                                    life: 3000
                                });
            }else{
                this.loaderSpin();
                this.$store.dispatch('saveAnswers', { worksheet_id: this.worksheet_id, answers: this.answers})
                    .then((resolve) => { 

                        if (typeof resolve.data == 'string' || typeof resolve.data == 'number'){
                            this.resultTypeService.format(
                                                resolve.data,
                                                this.worksheet.questions.length,
                                                this.worksheet.result_type_id
                            ).then(res => {
                                this.result = res;
                            });
                        }                                                

                        this.saved = true;
                        this.loaderStop();
                    })
                    .catch((error) => { 
                        this.$toast.add({ severity:'error', summary: error.message, life: 2000 });
                    });
            }
        }
    },
    async mounted() {    
        this.loaderSpin();
        await this.$store.dispatch('fetchWorksheet', this.worksheet_id);
        this.loaderStop();

        if ( !Object.keys(this.$store.getters.worksheet).length ) {
            this.$router.push({ name: '404' });
        }
    },
    resultTypeService: null,
    created() {
        this.resultTypeService = new ResultTypeService(this);
    },
};
</script>

<style scoped lang="scss">
    .description,
    .p-panel.p-component{
        margin-bottom: 2rem;
    }

    .p-card-header img {
        display: block;
        width: 430px;
        height: 330px;
        margin: 0 auto;
    }    

    .worksheet{
        ::v-deep(.p-card-body){
            .p-card-footer {
                display: flex;
                justify-content: space-between;
            }
        }
    }

    .result{
        ::v-deep(.p-card-body){
            text-align: center;
        }
    }     

    @media only screen and (max-width: 447px) {
        .p-card-header img {
            width: 100%;
            height: auto;
        }
    }
</style>
