<template>
    <div class="locale-switcher">
        <Dropdown v-model="$i18n.locale" :options="locales" optionValue="value" optionLabel="label" @change="storeLocale"/>
    </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { locales } from '@/config/locale.config';

export default {
    name: 'LocaleSwitcher',
    components: {
        Dropdown,
        Menu,
        Button
    },
    data() {
		return {}
	},
    computed: {
        locales() {
            let items = [];

            locales.forEach(element => {
                items.push({
                    label: this.$t(`common.locales.${element}`),
                    value: element,
                })
            });

            return items;
        }
    },
    methods: {
        storeLocale(event) {
            this.$store.dispatch('changeLang', this.$i18n.locale);
        }
    },
    mounted() {
        if ( this.$store.getters.lang !== undefined ) {
            this.$i18n.locale = this.$store.getters.lang;
        }        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .p-dropdown {
        border: none;

        &:focus {
            box-shadow: none;
            border: none;
            outline: none;
        }
    }

    .p-dropdown:not(.p-disabled).p-focus {
        box-shadow: none;
        border: none;
        outline: none;
    }   

</style>
