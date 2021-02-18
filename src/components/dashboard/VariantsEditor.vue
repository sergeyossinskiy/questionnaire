<template>

    <Panel class="variants">
        <template #header>
            <span class="title-editor">{{ $t('worksheet.variants') }}</span>            
            <Button icon="pi pi-plus" class="p-button-success" @click="add"/>
        </template>
       
        <DataTable :value="vars" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-init="onRowEditInit" @row-edit-save="onRowEditSave">
            <Column field="variant" :header="$t('worksheet.variant')">
                <template #editor="slotProps">
                    <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                </template>
            </Column>
            <Column field="correct" :header="$t('worksheet.correct')" headerStyle="width: 40px">
                <template #body="slotProps">
                    <Checkbox disabled="true" v-model="slotProps.data[slotProps.column.props.field]" :binary="true" />
                </template>
                <template #editor="slotProps">
                    <Checkbox v-if="correctOne || slotProps.data[slotProps.column.props.field] || countCorrect < 1"
                     v-model="slotProps.data[slotProps.column.props.field]" :binary="true" @click="correctChange"/>
                </template>
            </Column>
            <Column :rowEditor="true" headerStyle="width:7rem" bodyStyle="text-align:center"></Column>
            <Column headerStyle="width:4rem" bodyStyle="text-align:left">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-secondary p-button-text" @click="deleteRow(slotProps.data)" />
                </template>
            </Column>
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
        moreOneAnswer: Boolean,
        editVariants: Function
    },
    data() {
		return {
            editingCellRows: {},
            editingRows: [],
            correctOne: true,
            variants: []
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
            return this.vars.filter(x => x.correct == true).length;
        },
        vars() {
            return this.$store.getters.variants;
        }
    },
    methods: {
        add() {
            let vars = this.$store.getters.variants;

            vars.push({
                "id": '_' + vars.length+1,
                "variant": "", 
                "correct": false
            });

            this.$store.commit('setEditVariants', vars);
        },
        correctChange(e) {
            // e.currentTarget.checked = false;
            // e.currentTarget.querySelector('input').checked = false;
            // console.log( )
        },
        onRowEditInit(event) {
            if (!this.moreOneAnswer) {
                this.correctOne = this.countCorrect < 1;

                if (this.vars.length == 1) this.correctOne = true;
            }
            else{
                this.correctOne = this.moreOneAnswer;     
            }            
        },
        onRowEditSave(event) {
            this.editVariants(this.$store.getters.variants);
        },
        deleteRow(data) {
            const filtered = this.$store.getters.variants.filter(val => val.id !== data.id);
            this.$store.commit('setEditVariants', filtered);
            this.editVariants(filtered);
        },
        onInputChanges: _.debounce(function() {
            //console.log(this.question);
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
