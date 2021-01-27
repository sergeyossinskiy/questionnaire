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
        <Listbox v-model="selectedSection" :options="sections" optionLabel="title" optionValue="name" class="p-listbox">
            <template #option="slotProps">
                <router-link
                    tag="li"
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
		return {
            selectedSection: this.$route.params.name_section
        }
	},
    computed: {
        ...mapGetters(['lang']),
        appName() {
            return this.$config.appName;
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
            this.selectedSection = undefined;
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

    ::v-deep(.p-listbox) {
        li.p-listbox-item{
            text-align: center;
            padding: 0 !important;

            a {
                display: block;
                padding: 0.5rem 1rem;
            }
        }

        .p-listbox-item.p-highlight {
            border-radius: 20px;
        }

        .p-listbox-item:not(.p-highlight):not(.p-disabled):hover {
            border-radius: 20px;
        }
    }

</style>
