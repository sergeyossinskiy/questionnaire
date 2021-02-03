<template>
    <Panel>

        <template #header>
            {{ it.question }}
        </template>

        <div v-for="vr in it.variants" :key="vr.id" class="variants">
            <RadioButton :id="'variant'+vr.id" :name="'question'+it.id" :value="vr.id" v-model="checked" @change="change" />
            <label :for="'variant'+vr.id">{{ vr.variant }}</label>        
        </div>

        <label :for="'variant_other'+it.id" class="variant_other">{{ $t('worksheet.other_answer', lang) }}: </label>
        <InputText :id="'variant_other'+it.id" type="text" @input="changeOther" v-model="other"/>

    </Panel>
</template>

<script>
import _ from 'lodash';
import Panel from 'primevue/panel';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';

export default {
    name: 'OpenWithSingleOption',
    components: {
        Panel,
        RadioButton,
        InputText
    },
    props: {
        it: Object,
        onSetAnswer: Function
    },
    data() {
		return {
            checked: null,
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
            if ( this.other ) this.other = null;           
            this.sentChanges();
        },
        changeOther: function(event) {
            if ( this.checked ) this.checked = null;  
            this.other = event.currentTarget.value;
            this.sentChanges();
        },
        sentChanges: _.debounce(function() {
            this.onSetAnswer({
                question_id: this.it.id,
                answer: { checked: this.checked, other: this.other }
            })
        },500)
    },
    async mounted() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
