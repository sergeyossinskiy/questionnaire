<template>
    <div class="control">
        <Button icon="pi pi-user" class="p-button-raised p-button-rounded" @click="toggle"/>
        <Menu ref="menu" :model="items" :popup="true" />

        <LanguadeSwitcher/>    
    </div>
    
    <div class="app-title">
        <h1>{{ appName }}</h1><!-- {{ appPartnerName }} -->
    </div>
    <div class="app-partner-name">
        <span>Университет им. Ш. Уалиханова</span>
    </div>
    
    <ScrollPanel style="width: 100%; height: 200px">
        content
    </ScrollPanel>    
</template>

<script>
import Menu from 'primevue/menu';
import ScrollPanel from 'primevue/scrollpanel';
import Button from 'primevue/button';
import LanguadeSwitcher from './LanguadeSwitcher';

export default {
    name: 'Sidebar',
    components: {
        Menu,
        ScrollPanel,
        Button,
        LanguadeSwitcher
    },
    data() {
		return {
			items: [
				{
					label: 'Войти',
					command: () => {
						this.$auth.openSSOLogin();
					}
				},
				{
                    label: 'Зарегистрироваться',
                    command: () => {
						this.$auth.openSSORegister();
					}
                }
			]
		}
	},
    computed: {
        appName() {
            return this.$config.appName;
        },
        appPartnerName() {
            return this.$store.getters.partner.short_name;
        }
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        }
    },
    async mounted() {
        if ( !Object.keys(this.$store.getters.partner).length ){
            await this.$store.dispatch('fetchPartner');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .control {
        padding: 1rem 2rem;
    }

    .app-title {
        padding: 1rem 2rem;
    }

</style>
