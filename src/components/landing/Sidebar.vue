<template>
    <div class="control">
        <Button v-if="!atHome" icon="pi pi-home" class="p-button-raised p-button-rounded" @click="toHome"/>
        <ProfileMenu />   
        <LocaleSwitcher />         
    </div>
    
    <div class="app-title">
        <h1>{{ appName }}</h1><!-- {{ appPartnerName }} -->
    </div>
    
    <ScrollPanel style="width: 100%; height: 200px">
        <Listbox v-model="selectedSection" :options="sections" optionLabel="title" optionValue="name">
            <template #option="slotProps">
                <router-link
                    tag="li"
                    active-class="active"
                    :to="'/section/' + slotProps.option.name"
                >
                    <span>{{ $filters.translate( slotProps.option.title, lang )  }}</span>
                </router-link>
            </template>
        </Listbox>
    </ScrollPanel>    
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher';
import ProfileMenu from './ProfileMenu';
import ScrollPanel from 'primevue/scrollpanel';
import Listbox from 'primevue/listbox';
import Button from 'primevue/button';
import { mapGetters } from 'vuex';

export default {
    name: 'Sidebar',
    components: {
        ProfileMenu,
        LocaleSwitcher,
        ScrollPanel,
        Listbox,
        Button
    },
    data() {
		return {}
	},
    computed: {
        ...mapGetters(['lang']),
        appName() {
            return this.$config.appName;
        },
        selectedSection() {
            return this.$route.params.name_section;
        },
        sections() {
            return this.$store.getters.sections;
        },
        atHome() {
            return this.$route.name == 'Home';
        }
    },
    methods: {
        toHome (event){
            this.$router.push({ name: "Home"});
        }
    },
    async mounted() {
        if ( !Object.keys(this.$store.getters.sections).length ){
             await this.$store.dispatch('fetchSections');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    a {
       text-decoration: none;
       color: var(--text-color); 
    }

    .control {
        display: flex;
        justify-content: space-between;
        padding: 1rem 2rem;        
    }

    .app-title {
        padding: 1rem 2rem;
    }

    .p-listbox {
        border: none;
        padding: 0 2rem;
    }

</style>
