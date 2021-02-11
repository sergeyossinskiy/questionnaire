<template>

    <Panel>
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            Newfile
        </template>
        Manage
    </Panel>

</template>

<script>
import Panel from 'primevue/panel';
import Button from 'primevue/button';

export default {
    name: 'Newfile',
    components: {
        Panel,
        Button
    },
    data() {
		return {}
	},
    computed: {
    },
    methods: {
        toList() {
            this.$store.commit('setOperation', 'listfiles');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    ::v-deep(.p-panel-header){
        border: none;
    }
    ::v-deep(.p-panel-content){
        border: none;
    }

</style>
