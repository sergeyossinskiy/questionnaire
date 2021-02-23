<template>

    <Panel>
        
        <template #header>
            <Button icon="pi pi-angle-left" class="p-button-raised" @click="toList"/>
            <span>{{ $t('common.statistic') + " - " + title }}</span>
        </template>

        <template #icons>
           <Button icon="pi pi-file" label="Word" class="p-button-raised" @click="exportToWord"/>
        </template>
        
        <div class="p-grid p-px-3 p-px-md-5 p-mb-5">

            <component :is="type" />

        </div> 
        
    </Panel>    

</template>

<script>
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import Test from './statistic_types/Test';
import Questionnaire from './statistic_types/Questionnaire';
import {
    WidthType,
    BorderStyle,
    Document,
    Paragraph,
    Packer,
    TextRun,
} from "docx";
import { saveAs } from "file-saver";

export default {
    name: 'StatisticFile',
    components: {
        Button,
        Panel,
        Dropdown,
        Test,
        Questionnaire,
        WidthType,
        BorderStyle,
        Document,
        Paragraph,
        Packer,
        TextRun,
        saveAs
    },
    data() {
		return {
            worksheet_id: this.$route.params.id,
            type: undefined
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        },
        worksheet() {
            return this.$store.getters.stat_questionnaire;
        },
        title() {
            if( this.$store.getters.stat_questionnaire )
            return this.$filters.translate( this.$store.getters.stat_questionnaire.title, this.lang);
        }
    },
    methods: {
        toList() {
            this.$router.push({ path: "/statistic" });
        },
        exportToWord() {
            let doc = new Document();
            // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
            // This simple example will only contain one section
            doc.addSection({
            properties: {},
            children: [
            new Paragraph({
                children: [new TextRun(`Hi! My name is${this.firstname} ${this.lastname}.`),],
            }),
            new Paragraph({
                children: [
                new TextRun({
                text: this.message,
                bold: true,
                }),
                ],
            }),
            ],
            });
            // To export into a .docx file
            this.saveDocumentToFile(doc, `vuedoc.docx`);
        },
        saveDocumentToFile: function (doc, fileName) {
            const mimeType = "application/vnd.openxmlformats officedocument.wordprocessingml.document";
            Packer.toBlob(doc).then((blob) => {
                const docblob = blob.slice(0, blob.size, mimeType);
                saveAs(docblob, fileName);
            });
        }
    },
    async mounted() {
        spinner.spin();
        await this.$store.dispatch('fetchStatQuestionnaire', this.worksheet_id);
        this.type = this.worksheet.type.name;
        spinner.stop();

        // this.initLayoutDataView(window);
        // window.addEventListener("resize", this._initLayoutDataView);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    

</style>