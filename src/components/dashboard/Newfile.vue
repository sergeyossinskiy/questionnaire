<template>

    <Panel>
        
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            <span>{{ $t('common.new_file') }}</span>
        </template>
        
        <div class="p-grid p-px-3 p-px-md-5 p-mb-5">
            <div class="p-col-12 p-md-4">
                <h4>{{ $t('worksheet.category') }}</h4>
                <DropdownSections :options="sections" optionValue="id" :changeSection="onChangeData" />
            </div>
            <div class="p-col-12 p-md-4">
                <h4>{{ $t('worksheet.type') }}</h4>
                <DropdownTypes :options="types" optionValue="id" :changeType="onChangeData" />
            </div>
            <div class="p-col-12 p-md-4">
                <h4>{{ $t('common.language') }}</h4>
                <DropdownLangs :options="locales" :changeLang="onChangeData" />
            </div>

            <div class="p-col-12">
                <h4>{{ $t('worksheet.title') }}</h4>
                <InputMultiLang name="title" :changeTitle="onChangeData" />
            </div>

            <div class="p-col-12">
                <h4>{{ $t('worksheet.description') }}</h4>
                <TextareaMultiLang name="description" :changeDescription="onChangeData" />
            </div>

            <div class="p-col-12">
               <QuestionsEditor :type="data['type_id']" :questions="data.questions" :questionsEdit="onQuestionsEdit" :questionDelete="onQuestionDelete"/>
            </div>

            <div v-if="resultTypesVisible" class="p-col-12">
                <h4>{{ $t('worksheet.result_type') }}</h4>
               <DropdownResultTypes :options="resultTypes" optionValue="id" :changeResultType="onChangeData" />
            </div>

            <div class="p-col-12 align-right">
                <Button :label="$t('common.save')" @click="saveWorksheet"/>
            </div>
        </div> 
        
    </Panel>

</template>

<script>
import { FilesService } from '@/services';
import { locales } from '@/config/locale.config';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import DropdownTypes from './DropdownTypes';
import DropdownSections from './DropdownSections';
import DropdownLangs from './DropdownLangs';
import InputMultiLang from './InputMultiLang';
import TextareaMultiLang from './TextareaMultiLang';
import QuestionsEditor from './QuestionsEditor';
import DropdownResultTypes from './DropdownResultTypes';

export default {
    name: 'Newfile',
    components: {
        Panel,
        Button,
        DropdownTypes,
        DropdownSections,
        DropdownLangs,
        InputMultiLang,
        TextareaMultiLang,
        QuestionsEditor,
        DropdownResultTypes
    },
    data() {
		return {
            worksheet: null,
            selectedCity: null,
            resultTypesVisible: false,
            locales: locales,
            data: {
                "questions": []
            }
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
        },
        resultTypes() {
            return this.filesService.getResultTypes();
        }
    },
    methods: {
        toList() {
            this.$store.commit('setOperation', 'listfiles');
        },
        onChangeData(name, data) {
            if (name && data){
                this.data[name] = data;
            }
            if (name == 'type_id') this.setResultTypesVisible();
        },
        onQuestionsEdit(data) {
            if (this.data['questions']){
                this.data['questions'].push(data);
            }
            else {
                this.data['questions'] = [];
                this.data['questions'].push(data);
            }
        },
        onQuestionDelete(data) {
            if (this.data['questions']){
                this.data['questions'] = this.data['questions'].filter(val => val !== data);
            }
        },
        saveWorksheet() {
            if ( this.filesService.validation(this) ) {
                this.filesService.save(this.data);
            }
        },
        setResultTypesVisible() {
            if (this.data['type_id']) {
                let type = this.types.find(t => t.id == this.data['type_id'])
                let type_name = type ? type.name : undefined;

                if (type_name == "test"){
                    this.resultTypesVisible = true;
                }else{
                    this.resultTypesVisible = false;
                }              
            }
            else {
                this.resultTypesVisible = false;
            }
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

    h4 {
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
    }

    .p-dropdown {
        width: 100%;
    }

    .align-right {
        text-align: right;
    }

</style>