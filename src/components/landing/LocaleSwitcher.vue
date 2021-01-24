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
import { CookieUtility } from '@/utilities'; 

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
            CookieUtility.set('lang', this.$i18n.locale);
        }
    },
    mounted() {
        if ( CookieUtility.get('lang') !== undefined ) {
            this.$i18n.locale = CookieUtility.get('lang');
        }        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
