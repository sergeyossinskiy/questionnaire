<template>

    <Panel>
        
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            <span>{{ $t('common.edit') }}</span>
        </template>
        
        <div class="p-grid p-px-3 p-px-md-5 p-mb-5">
            <div class="p-col-12 p-md-4">
                <h4>{{ $t('worksheet.category') }}</h4>
                <DropdownSections :value="defData" :options="sections" optionValue="id" :changeSection="onChangeData" />
            </div>
            <div class="p-col-12 p-md-4">
                <h4>{{ $t('worksheet.type') }}</h4>
                <DropdownTypes :value="defData" :options="types" optionValue="id" :changeType="onChangeData" />
            </div>
            <div class="p-col-12 p-md-4">
                <h4>{{ $t('common.language') }}</h4>
                <DropdownLangs :value="defData" :options="locales" :changeLang="onChangeData" />
            </div>

            <div class="p-col-12">
                <h4>{{ $t('worksheet.title') }}</h4>
                <InputMultiLang :defValue="defData" name="title" :changeTitle="onChangeData" />
            </div>

            <div class="p-col-12">
                <h4>{{ $t('worksheet.description') }}</h4>
                <TextareaMultiLang :defValue="defData" name="description" :changeDescription="onChangeData" />
            </div>

            <div v-show="resultTypesVisible" class="p-col-12">
                <h4>{{ $t('worksheet.result_type') }}</h4>
               <DropdownResultTypes :value="defData" :options="resultTypes" optionValue="id" :changeResultType="onChangeData" />
            </div>

            <div class="p-col-12">
                <h4>{{ $t('worksheet.requirements') }}</h4>
                <DropdownRequirements :value="defData" :options="requirements" optionValue="id" :changeType="onChangeData" />
            </div> 

            <div class="p-col-12">
               <QuestionsEditor :type="defData ? defData['type_id'] : undefined" :questions="data ? data.questions : undefined" :questionsEdit="onQuestionsEdit" :questionDelete="onQuestionDelete"/>
            </div>           

            <div class="p-col-12 p-pt-5 p-pb-2">
                <div class="p-grid">
                    <div class="p-col-6 align-left">
                        <Button class="p-button-secondary" :label="$t('common.delete')" @click="deleteWorksheet"/>
                    </div>
                    <div class="p-col-6 align-right">
                        <Button :label="$t('common.save')" @click="saveWorksheet"/>
                    </div>
                </div>
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
import DropdownRequirements from './DropdownRequirements';

export default {
    name: 'Editfile',
    components: {
        Panel,
        Button,
        DropdownTypes,
        DropdownSections,
        DropdownLangs,
        InputMultiLang,
        TextareaMultiLang,
        QuestionsEditor,
        DropdownResultTypes,
        DropdownRequirements
    },
    data() {
		return {
            worksheet_id: this.$store.getters.operation_params['worksheet_id'],
            resultTypesVisible: false,
            locales: locales,
            defData: undefined
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
        },
        requirements() {
            return this.filesService.getRequirements();
        },
        data() {
            return this.defData = this.$store.getters.edited[this.worksheet_id];
        }
    },
    methods: {
        toList() {
            this.$store.commit('setOperation', 'listfiles');
            this.$store.commit('setOperationParams', {});
        },
        onChangeData(name, data) {
            let worksheet = this.data;

            if (name && data){
                worksheet[name] = data;
            }
            if (name == 'type_id' && worksheet) this.setResultTypesVisible();

            this.$store.commit('setEdited', { 
                "worksheet_id": this.worksheet_id, 
                "worksheet": worksheet
            });
        },
        onQuestionsEdit(data) {
            if (this.data['questions']){
                let exists = this.data['questions'].find(q => q.id == data.id);

                if( exists ) {
                    this.data['questions'] = this.data['questions'].map(o => {
                        if (o.id === data.id) {
                            return data;
                        }
                        return o;
                    });
                }
                else this.data['questions'].push(data);
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
                this.filesService.edit(this);
            }
        },
        deleteWorksheet() {
            this.filesService.delete(this);
        },
        setResultTypesVisible() {
            if (this.data['type_id'] &&  this.types) {
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

        this.filesService.loadWorksheet(this.worksheet_id);
    },
    mounted() {
    }
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

    .align-left {
        text-align: left;
    }

</style>