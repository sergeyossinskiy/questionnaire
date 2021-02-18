<template>

    <MultiSelect v-model="selected" :options="options" :optionValue="optionsValue" :change="onChangeType(selected)" :placeholder="$t('worksheet.select_requirements')">
        <template #value="slotProps">
            <div class="p-multiselect-car-token" v-for="option of slotProps.value" :key="option">
                <span>{{ currentPlaceholder(option) }}</span>
            </div>
        </template>
        <template #option="slotProps">
            <div class="p-dropdown-car-option">
                <span>{{ $filters.translate( slotProps.option.title, lang )  }}</span>
            </div>
        </template>
    </MultiSelect>

</template>

<script>
import MultiSelect from 'primevue/multiselect';

export default {
    name: 'DropdownRequirements',
    components: {
        MultiSelect
    },
    props: {
        options: Object,
        optionsValue: String,
        changeType: Function,
        value: Object
    },
    data() {
		return {
            selected: null
        }
	},
    watch: {
        value: function (newdata, olddata) {
            let requirements = newdata.requirements.map(o => {
                if (typeof o == 'object') return o.requirement_id;
                return o;
            });
            this.selected = requirements;
        }
    },
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        }
    },
    methods: {
        onChangeType: function(data) {
            this.changeType('requirements', data);
        },
        currentPlaceholder(selected){
            if ( this.options && selected !== undefined){
                let option = this.options.find((x) => {return x.id == selected;});
                let title = option ? option.title : undefined;
                return this.$filters.translate(title, this.lang);
            }            
        }
    },
    mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .p-multiselect {
        width: 100%;
    }
</style>
