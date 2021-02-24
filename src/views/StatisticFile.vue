<template>

    <component :is="type" />

</template>

<script>
import Test from './statistic_types/Test';
import Questionnaire from './statistic_types/Questionnaire';

export default {
    name: 'StatisticFile',
    components: {
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
            return this.$store.getters.stat_questionnaire;
        }
    },
    methods: {},
    async mounted() {
        spinner.spin();
        await this.$store.dispatch('fetchStatQuestionnaire', this.worksheet_id);
        this.type = this.worksheet.type.name;
        spinner.stop();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>