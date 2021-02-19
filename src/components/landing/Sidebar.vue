<template>
    <div class="control">
        <div class="p-d-flex">
            <Button v-if="!atHome" icon="pi pi-home" class="p-button-raised p-mr-3" @click="toHome"/>
            <ProfileMenu />  
        </div>         
        <LocaleSwitcher />         
    </div>
    
    <div class="app-title">
        <h1>{{ appName }}</h1>
        <span class="by">{{ $config.appSubTitle }}</span>
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

    <Dropdown v-model="selectedSection" :options="sections" optionLabel="title" optionValue="name">
        <template #value="">
            <span>{{ currentSectionPlaceholder || $t('section.select_category') }}</span>
        </template>
        <template #option="slotProps">
            <router-link
                tag="li"
                :to="'/section/' + slotProps.option.name"
            >
                <span>{{ $filters.translate( slotProps.option.title, lang )  }}</span>
            </router-link>
        </template>
    </Dropdown>  
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher';
import ProfileMenu from './ProfileMenu';
import ScrollPanel from 'primevue/scrollpanel';
import Listbox from 'primevue/listbox';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { mapGetters } from 'vuex';

export default {
    name: 'Sidebar',
    components: {
        ProfileMenu,
        LocaleSwitcher,
        ScrollPanel,
        Listbox,
        Dropdown,
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
        },
        currentSectionPlaceholder(){
            if (this.sections.length && this.selectedSection !== undefined){
                let section = this.sections.find((x) => {return x.name == this.selectedSection;});
                let title = section ? section.title : undefined;
                return this.$filters.translate(title, this.lang);
            }            
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
            const spinner = document.querySelector('.p-progress-spinner-container');
            spinner.style.display = 'block';

            await this.$store.dispatch('fetchSections');

            spinner.style.display = 'none';
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
        display: flex;
        justify-content: center;

        h1 {
           text-align: center; 
           margin: 0;
        }

        .by{
            line-height: 50px;
            color: #2196F3;
            vertical-align: baseline;
            margin-left: 0.5rem;
            font-family: 'Ubuntu';
            font-size: 13px;
        }
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

    .p-dropdown {
        display: none;
        border: none;
        background-color: #f8f9fa;
        width: -webkit-fill-available;

        li.p-dropdown-item{
            a {
                display: block;
                padding: 0.5rem 1rem;
            }
        }
    }

    @media only screen and (max-width: 767px) {
        .p-dropdown {
            display: inline-flex;
            margin: 0 2rem 2rem 2rem;
        }

        .p-scrollpanel,
        .p-listbox {
            display: none;
        }
    }

</style>
