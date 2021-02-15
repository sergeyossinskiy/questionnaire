<template>

    <Panel>
        <template #header>
            <span class="title-editor">{{ $t('worksheet.questions') }}</span>            
            <Button icon="pi pi-plus" class="p-button-success" @click="openNewQuestion"/>
        </template>
        Content
    </Panel>

    <Dialog v-model:visible="questionModalDisplay" :modal="true" class="new-question">
        <template #header>
            <h4>{{ $t('worksheet.question') }}</h4>
        </template>

        <h5>{{ $t('worksheet.type') }}</h5>
        <DropdownQuestionTypes :options="questionTypes" optionValue="id" :changeType="onChangeType"/>

        <h5>{{ $t('worksheet.question') }}</h5>
        <InputText name="'question" @input="onInputChanges" v-model="question"/>

        <VariantsEditor :moreOneAnswer="moreOneAnswer"/>

        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" autofocus />
        </template>
    </Dialog>

</template>

<script>
import { FilesService } from '@/services';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import VariantsEditor from './VariantsEditor';
import DropdownQuestionTypes from './DropdownQuestionTypes';

export default {
    name: 'QuestionsEditor',
    components: {
        Panel,
        Button,
        Dialog,
        InputText,
        VariantsEditor,
        DropdownQuestionTypes
    },
    props: {
        type: Number
    },
    data() {
		return {
            questionModalDisplay: false,
            question: undefined,
            question_type: undefined
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
            if (this.question_type) {
                return this.question_type.more_one_answer;
            }

            return false;
        }
    },
    methods: {
        openNewQuestion() {
            this.questionModalDisplay = true;
        },
        onInputChanges: _.debounce(function() {
            console.log(this.question);
        },500),
        onChangeType(data) {
            this.question_type = this.questionTypes.find(x => x.id == data);
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
