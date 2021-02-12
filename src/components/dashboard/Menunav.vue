<template>
    <Menubar :model="items" :options="items">
        <template #start>
            <router-link to="/home">
                <h1 class="app-name">{{ appName }}</h1>
            </router-link>
            
            <!-- <img alt="logo" src="../../assets/images/logo.svg" height="40" class="p-mr-2"> -->
        </template>
        <template #end>
            <LocaleSwitcher />
        </template>
    </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import LocaleSwitcher from '../landing/LocaleSwitcher';
import InputText from 'primevue/inputtext';

export default {
    name: 'Menunav',
    components: {
        Menubar,
        Button,
        LocaleSwitcher,
        InputText
    },
    data() {
		return {
            items: this.getItemsMenu()
        }
	},
    computed: {
        appName() {
            return this.$config.appName;
        },
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        }
    },
    watch: {
        lang: function (newlang, oldlang) {
            this.items = this.getItemsMenu();
        }
    },
    methods: {
        getItemsMenu() {
            return [
                {
                    label: this.$t('common.file'),
                    icon: 'pi pi-fw pi-file',
                    items: [
                        {
                            label: this.$t('common.create'),
                            icon:'pi pi-fw pi-plus',
                            command: () => {
                                this.$store.commit('setOperation', 'newfile');
                            }
                        },
                        {
                            separator:true
                        },
                        {
                            label:'Export',
                            icon:'pi pi-fw pi-external-link'
                        }
                    ]
                }
            ];
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    h1.app-name {
        margin: 0 1rem 0 0;
        color: #2196F3;
    }

    .p-menubar{
        position: sticky;
        padding: 0.5rem 1.5rem 0.5rem 1.5rem;
        border: none;
        z-index: 555;
    }

    a {
        text-decoration: none;
    }

</style>
