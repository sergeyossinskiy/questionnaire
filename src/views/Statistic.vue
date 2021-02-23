<template> 

    <component :is="operation" />

</template>

<script>
import Panel from 'primevue/panel';
import { Liststatistics } from '../components/dashboard';

export default {
    name: "Statistic",
    components: {
        Panel,
        Liststatistics
    },
    data() {
        return {}
    },
    computed: {
        operation() {
            return this.$store.getters.stat_section;
        }
    },
    methods: {
    },
    async mounted() {    
    }
};
</script>

<style scoped lang="scss">
    
</style>
