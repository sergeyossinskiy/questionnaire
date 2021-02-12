<template>

    <Dropdown v-model="selected" :options="options">
        <template #value="">
            <span>{{ currentPlaceholder || $t('worksheet.select_lang') }}</span>
        </template>
        <template #option="slotProps">
            <div class="p-dropdown-car-option">
                <span>{{ $t(`common.locales.${slotProps.option}`) }}</span>
            </div>
        </template>
    </Dropdown>

</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
    name: 'DropdownLangs',
    components: {
        Dropdown
    },
    props: {
        options: Object
    },
    data() {
		return {
            selected: undefined
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        currentPlaceholder(){
            if ( this.options && this.selected !== undefined){
                return this.$t(`common.locales.${selected}`);
            }            
        }
    },
    methods: {},
    mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
