<template>
    <Panel>

        <template #header>
            {{ it.question }}
        </template>

        <label :for="'variant_other'+it.id">{{ $t('worksheet.answer', lang) }}: </label>
        <InputText :id="'variant_other'+it.id" type="text" @input="changeOther" />

    </Panel>
</template>

<script>
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';

export default {
    name: 'OpenWithoutOptions',
    components: {
        Panel,
        InputText
    },
    props: {
        it: Object,
        onSetAnswer: Function
    },
    data() {
		return {
            other: null
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        }
    },
    methods: {
        change: function() {            
            this.sentChanges();
        },
        changeOther: function(event) {
            this.other = event.currentTarget.value;
            this.sentChanges();
        },
        sentChanges: _.debounce(function() {
            this.onSetAnswer({
                question_id: this.it.id,
                answer: { other: this.other }
            })
        },500)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
