<template>

    <Panel>
        
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            <span>{{ $t('common.statistic') }}</span>
        </template>
        
        <div class="p-grid p-px-3 p-px-md-5 p-mb-5">

            <component :is="type" />

        </div> 
        
    </Panel>    

</template>

<script>
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import Test from './statistic_types/Test';
import Questionnaire from './statistic_types/Questionnaire';

export default {
    name: 'StatisticFile',
    components: {
        Button,
        Panel,
        Dropdown,
        Test,
        Questionnaire
    },
    data() {
		return {
            worksheet_id: this.$route.params.id,
            type: undefined
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        worksheet() {
            console.log(this.$store.getters.stat_questionnaire);
            return this.$store.getters.stat_questionnaire;
        }
    },
    methods: {
        toList() {
            this.$router.push({ path: "/statistic" });
        },
    },
    async mounted() {
        spinner.spin();
        await this.$store.dispatch('fetchStatQuestionnaire', this.worksheet_id);
        this.type = this.worksheet.type.name;
        spinner.stop();

        // this.initLayoutDataView(window);
        // window.addEventListener("resize", this._initLayoutDataView);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    

</style>