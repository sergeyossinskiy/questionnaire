<template>

    <Panel>
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            <span>{{ $t('common.new_file') }}</span>
        </template>
        
        <div class="p-grid p-px-3 p-px-md-5">
            <div class="p-col-12 p-md-4">
                <h5>category</h5>
                <DropdownSections :options="sections" optionValue="id" />
            </div>
            <div class="p-col-12 p-md-4">
                <h5>type</h5>
                <DropdownTypes :options="types" optionValue="id"/>
            </div>
            <div class="p-col-12 p-md-4">
                <h5>language</h5>
                <DropdownLangs :options="locales" />
            </div>

            <div class="p-col-12">
                <h5>title</h5>
                <InputMultiLang name="title"/>
            </div>

            <div class="p-col-12">
                <h5>description</h5>
                <TextareaMultiLang name="description"/>
            </div>
        </div>
        
    </Panel>

</template>

<script>
import { FilesService } from '@/services';
import { locales } from '@/config/locale.config';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import DropdownTypes from './DropdownTypes';
import DropdownSections from './DropdownSections';
import DropdownLangs from './DropdownLangs';
import InputMultiLang from './InputMultiLang';
import TextareaMultiLang from './TextareaMultiLang';

export default {
    name: 'Newfile',
    components: {
        Panel,
        Button,
        Dropdown,
        DropdownTypes,
        DropdownSections,
        DropdownLangs,
        InputMultiLang,
        TextareaMultiLang
    },
    data() {
		return {
            worksheet: null,
            selectedCity: null,
            locales: locales,
            cities: [
                {name: 'New York', code: 'NY'},
                {name: 'Rome', code: 'RM'},
                {name: 'London', code: 'LDN'},
                {name: 'Istanbul', code: 'IST'},
                {name: 'Paris', code: 'PRS'}
            ]
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        types() {
            return this.filesService.getTypes();
        },
        sections() {
            return this.filesService.getSections();
        }
    },
    methods: {
        toList() {
            this.$store.commit('setOperation', 'listfiles');
        }
    },
    filesService: null,
    created() {
        this.filesService = new FilesService( this.$store );
        this.filesService.loadDependences();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    ::v-deep(.p-panel-header){
        border-radius: 0;
        padding: 0.5rem 2rem 0.5rem 2rem;
        border-left: 0;
        border-right: 0;
    }
    ::v-deep(.p-panel-content){
        border: none;
    }

    h5 {
        margin-top: 0;
    }

    .p-dropdown {
        width: 100%;
    }

</style>
