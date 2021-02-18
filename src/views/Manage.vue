<template> 

    <component :is="operation" />

</template>

<script>
import Panel from 'primevue/panel';
import { Listfiles, Newfile, Editfile } from '../components/dashboard';

export default {
    name: "Manage",
    components: {
        Panel,
        Listfiles,
        Newfile,
        Editfile
    },
    data() {
        return {}
    },
    computed: {
        operation() {
            return this.$store.getters.operation;
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
