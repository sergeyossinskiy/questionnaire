<template>    
        
    <DataTable :value="questions" dataKey="id">
        <Column field="question">
            <template #header>
                <span class="title-editor">{{ $t('worksheet.questions') }}</span>
            </template>
            <template #body="slotProps">
                {{ slotProps.data[slotProps.column.props.field] }}
            </template>
        </Column>
        <Column headerStyle="width:7rem;text-align: right;" bodyStyle="text-align:right">
            <template #header>            
                <Button icon="pi pi-plus" class="p-button-success" @click="openNewQuestion"/>
            </template>
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-mr-1" @click="editRow(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-secondary" @click="deleteRow(slotProps.data)" />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="questionModalDisplay" :modal="true" class="new-question">
        <template #header>
            <h4>{{ $t('worksheet.question') }}</h4>
        </template>

        <h5>{{ $t('worksheet.type') }}</h5>
        <DropdownQuestionTypes :selected="question_type_id" :options="questionTypes" optionValue="id" :changeType="onChangeType"/>

        <h5>{{ $t('worksheet.question') }}</h5>
        <InputText name="'question" @input="onInputChanges" v-model="question"/>

        <VariantsEditor v-show="varEditorVisible" :moreOneAnswer="moreOneAnswer" :editVariants="onEditVariants"/>

        <template #footer>
            <Button :label="$t('common.cancel')" @click="closeNewQuestion" icon="pi pi-times" class="p-button-text"/>
            <Button :label="$t('common.save')" @click="saveNewQuestion" icon="pi pi-check" autofocus />
        </template>
    </Dialog>

    <Toast />

</template>

<script>
import Toast from 'primevue/toast';
import { FilesService } from '@/services';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import VariantsEditor from './VariantsEditor';
import DropdownQuestionTypes from './DropdownQuestionTypes';

export default {
    name: 'QuestionsEditor',
    components: {
        Toast,
        Panel,
        Button,
        Dialog,
        DataTable,
        Column,
        InputText,
        VariantsEditor,
        DropdownQuestionTypes
    },
    props: {
        type: Number,
        questions: Array,
        questionsEdit: Function,
        questionDelete: Function,
    },
    data() {
		return {
            questionModalDisplay: false,
            question_id: undefined,
            question: undefined,
            question_type: undefined,
            variants: [],
            varEditorVisible: true,
            question_type_id: undefined
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        questionTypes() {
            let q_types = this.filesService.getQuestionTypes();
            return this.filesService.filterQuestionType(q_types, this.type);
        },
        moreOneAnswer() {
            if (this.question_type !== undefined) {
                return !!this.question_type.more_one_answer;
            }

            return false;
        }
    },
    methods: {
        openNewQuestion() {
            this.$store.commit('setEditVariants', []);

            this.question_id = undefined;
            this.question = undefined;
            this.question_type = undefined;
            this.question_type_id = undefined;

            this.questionModalDisplay = true;
        },
        closeNewQuestion() {
            this.questionModalDisplay = false;
            this.$store.commit('setEditVariants', []);            

            // this.question_id = undefined;
            // this.question = undefined;
            // this.question_type = undefined;            
        },
        deleteRow(data) {
            this.questionDelete(data);
        },
        editRow(data) {
            this.$store.commit('setEditVariants', data.variants);

            this.question_id = data.id;
            this.question = data.question;
            this.question_type = data;
            this.question_type_id = data.type_id;
            this.variants = data.variants;

            this.questionModalDisplay = true;
        },
        saveNewQuestion() {
            if (this.question && this.question_type) {
                this.questionsEdit({
                    "id": this.question_id || '_' + (this.questions.length+1),
                    "question": this.question,
                    "type_id": this.question_type.id,
                    "variants": this.variants
                });

                this.closeNewQuestion();
            }
            else {
                this.$toast.add({   
                    severity: 'warn', 
                    summary: this.$t('worksheet.enter_required_data'),
                    life: 3000
                });
            }
        },
        onInputChanges: _.debounce(function() {
            //console.log(this.question);
        },500),
        onChangeType(data) {
            this.question_type = this.questionTypes.find(x => x.id == data);

            if ((this.question_type ? this.question_type.name : '') == 'open_without_options'){
                this.varEditorVisible = false;
            }
            else{
                this.varEditorVisible = true;
            }
        },
        onEditVariants(data) {
            this.variants = data;
        }
    },
    filesService: null,
    created() {
        this.filesService = new FilesService( this.$store );
        this.filesService.loadDependences();
    },
    mounted() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    ::v-deep( .p-datatable-header ) {
        display: flex;
        align-items: center;
    }

    .title-editor {
        width: -webkit-fill-available;
    }

    h4 {
        margin: 0;
    }

    h5 {
        margin: 0.5rem;
    }

    ::v-deep( .new-question ) {
        width: 70vw;

        .p-dropdown {
            width: 100%;
        }

        .p-inputtext:nth-child(4) {
            margin-bottom: 1rem;
            width: 100%;
        }
    }
</style>
