<template> 

    <Card>
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
            <Button icon="pi pi-check" :label="$t('worksheet.complete')" />
            <Button icon="pi pi-sign-out" :label="$t('worksheet.stop')" @click="exit" class="p-button-secondary" style="margin-left: .5em" />
        </template>
    </Card>

</template>

<script>
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
            answers: {}
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
        exit() {
            this.$router.push({ path: `/section/${this.worksheet.section.name}`});
            this.$store.dispatch('clearWorksheet'); 
        },
        onSetAnswer(data) {
            this.answers[data.question_id] = data.answer;
            console.log(this.answers);
        }
    },
    async mounted() {        
        await this.$store.dispatch('fetchWorksheet', this.worksheet_id);   
        console.log(this.$store.getters.worksheet);     
    }
};
</script>

<style scoped lang="scss">
    // .p-divider.p-divider-horizontal {
    //     margin: 0 0 1rem 0;
    // }

    .description,
    .p-panel.p-component{
        margin-bottom: 2rem;
    }
</style>
