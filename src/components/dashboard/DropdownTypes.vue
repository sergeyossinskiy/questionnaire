<template>

    <Dropdown v-model="selected" :options="options" :optionValue="optionsValue" :change="onChangeType(selected)">
        <template #value="">
            <span>{{ currentPlaceholder || $t('worksheet.select_type') }}</span>
        </template>
        <template #option="slotProps">
            <div class="p-dropdown-car-option">
                <span>{{ $filters.translate( slotProps.option.title, lang )  }}</span>
            </div>
        </template>
    </Dropdown>

</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
    name: 'DropdownTypes',
    components: {
        Dropdown
    },
    props: {
        options: Object,
        optionsValue: String,
        changeType: Function,
        value: Object
    },
    data() {
		return {
            selected: undefined
        }
	},
    watch: {
        value: function (newdata, olddata) {
            this.selected = newdata.type_id;
        }
    },
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        currentPlaceholder(){
            if ( this.options && this.selected !== undefined){
                let title = this.options.find((x) => {return x.id == this.selected;}).title;
                return this.$filters.translate(title, this.lang);
            }            
        }
    },
    methods: {
        onChangeType: function(data) {
            this.changeType('type_id', data);
        }
    },
    mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
