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

            <Divider align="left">
                <b>{{ $t('worksheet.description') }}</b>
            </Divider>
            {{ $filters.translate(worksheet.description, lang) }}
            <Divider />

        </template>

        <template #footer>
            <Button icon="pi pi-check" :label="$t('worksheet.complete')" />
            <Button icon="pi pi-sign-out" :label="$t('worksheet.stop')" @click="exit" class="p-button-secondary" style="margin-left: .5em" />
        </template>
    </Card>

</template>

<script>
import { mapGetters } from 'vuex';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

export default {
    name: "Worksheet",
    components: {
        Card,
        Button,
        Divider
    },
    data() {
        return {
            worksheet_id: this.$route.params.id_worksheet,
        }
    },
    computed: {
        ...mapGetters(['lang']),
        worksheet_name () {
           return this.$store.getters.worksheet.title;
        },
        worksheet() {
            return this.$store.getters.worksheet;
        }  
    },
    methods: {
        exit() {
            this.$router.push({ path: `/section/${this.worksheet.section_name}`});
            this.$store.dispatch('clearWorksheet'); 
        }
    },
    async mounted() {        
        await this.$store.dispatch('fetchWorksheet', this.worksheet_id);        
    }
};
</script>

<style scoped lang="scss">
    // .p-divider.p-divider-horizontal {
    //     margin: 0 0 1rem 0;
    // }
</style>
