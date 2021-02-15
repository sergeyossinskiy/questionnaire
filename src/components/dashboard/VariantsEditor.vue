<template>

    <Panel class="variants">
        <template #header>
            <span class="title-editor">{{ $t('worksheet.variants') }}</span>            
            <Button icon="pi pi-plus" class="p-button-success" @click="add"/>
        </template>
       
        <DataTable :value="variants" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-init="onRowEditInit" @row-edit-cancel="onRowEditCancel">
            <Column field="variant" header="variant">
                <template #editor="slotProps">
                    <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                </template>
            </Column>
            <Column field="correct" header="correct" headerStyle="width: 40px">
                <template #body="slotProps">
                    <Checkbox disabled="true" v-model="slotProps.data[slotProps.column.props.field]" :binary="true" />
                </template>
                <template #editor="slotProps">
                    <Checkbox v-if="correctOne || slotProps.data[slotProps.column.props.field] || countCorrect < 1"
                     v-model="slotProps.data[slotProps.column.props.field]" :binary="true" @click="correctChange"/>
                </template>
            </Column>
            <Column :rowEditor="true" headerStyle="width:7rem" bodyStyle="text-align:center"></Column>
        </DataTable>

    </Panel>

</template>

<script>
import { FilesService } from '@/services';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';

export default {
    name: 'VariantsEditor',
    components: {
        Panel,
        Button,
        Dialog,
        InputText,
        DataTable,
        Column,
        Checkbox
    },
    props: {
        types: Array,
        moreOneAnswer: Boolean
    },
    data() {
		return {
            variants: [],
            editingCellRows: {},
            editingRows: [],
            correctOne: true
        }
	},
    originalRows: null,
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        questionTypes() {
            return this.filesService.getQuestionTypes();
        },
        countCorrect() {
            return this.variants.filter(x => x.correct == true).length;
        }
    },
    methods: {
        add() {
            this.variants.push({
                "id": this.variants.length+1,
                "variant": "", 
                "correct": false
            });
        },
        correctChange(e) {
            // e.currentTarget.checked = false;
            // e.currentTarget.querySelector('input').checked = false;
            // console.log( )
        },
        onRowEditInit(event) {
            if (!this.moreOneAnswer) {
                this.correctOne = this.countCorrect < 1;

                if (this.variants.length == 1) this.correctOne = true;
            }
            else{
                this.correctOne = this.moreOneAnswer;     
            }            
        },
        onRowEditCancel(event) {
            console.log(this.variants);
            //this.variants[event.index] = this.originalRows[event.index];
        },
        onInputChanges: _.debounce(function() {
            console.log(this.question);
        },500)
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

    .p-inputtext {
        width: 100%;
    }

    ::v-deep( .p-panel-content ) {
        padding: 0;
    }
</style>
