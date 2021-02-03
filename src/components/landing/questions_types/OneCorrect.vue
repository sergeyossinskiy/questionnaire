<template>
    <Panel>

        <template #header>
            {{ it.question }}
        </template>

        <div v-for="vr in it.variants" :key="vr.id">
            <RadioButton :id="'variant'+vr.id" :name="'question'+it.id" :value="vr.id" v-model="checked" @change="change"/>
            <label :for="'variant'+vr.id">{{ vr.variant }}</label>        
        </div>

    </Panel>
</template>

<script>
import { mapGetters } from 'vuex';
import Panel from 'primevue/panel';
import RadioButton from 'primevue/radiobutton';

export default {
    name: 'OneCorrect',
    components: {
        Panel,
        RadioButton
    },
    props: {
        it: Object,
        onSetAnswer: Function
    },
    data() {
		return {
            checked: null
        }
	},
    computed: {
        ...mapGetters(['lang']),
    },
    methods: {
        change: function() {
            this.onSetAnswer({
                question_id: this.it.id,
                answer: this.checked
            })
        }
    },
    async mounted() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
