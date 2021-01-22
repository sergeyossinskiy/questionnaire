<template>
    <div class="control">
        <ProfileMenu />
        <p>{{ $t('common.login') }}</p>
        <LocaleSwitcher />    
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
import ScrollPanel from 'primevue/scrollpanel';
import LocaleSwitcher from './LocaleSwitcher';
import ProfileMenu from './ProfileMenu';

export default {
    name: 'Sidebar',
    components: {
        ScrollPanel,
        ProfileMenu,
        LocaleSwitcher
    },
    data() {
		return {}
	},
    computed: {
        appName() {
            return this.$config.appName;
        },
        appPartnerName() {
            return this.$store.getters.partner.short_name;
        },
    },
    methods: {},
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
