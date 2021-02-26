import {
    WidthType,
    BorderStyle,
    Document,
    Paragraph,
    Packer,
    TextRun,
    AlignmentType,
    Table,
    TableRow,
    TableCell,
    convertInchesToTwip
} from "docx";
import { saveAs } from "file-saver";

export class WordService {
    
    constructor() {}
  
    export($this) {
        this.doc = new Document();
            
        this.title = new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: $this.$t('common.statistic') + " - " + $this.title,
                    bold: true,
                    size: 26
                }),
            ],
            spacing: {
                after: 200
            },
        });

        let type = $this.$store.getters.stat_questionnaire.type.name;

        if (type == 'test'){
            this.exportTest($this);
        }else{
            this.exportQuestionnaire($this);
        }
    }

    saveDocumentToFile(doc, fileName) {
        const mimeType = "application/vnd.openxmlformats officedocument.wordprocessingml.document";
        Packer.toBlob(doc).then((blob) => {
            const docblob = blob.slice(0, blob.size, mimeType);
            saveAs(docblob, fileName);
        });
    }

    exportTest($this) {
        let rows = [];
        let count_r = 0;

        rows.push(
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("№")],
                        margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                        borders: {top: {style: BorderStyle.INSET,size: 2}}
                    }),
                    new TableCell({
                        children: [new Paragraph($this.$t('results.fullname'))],
                        margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                        borders: {top: {style: BorderStyle.INSET,size: 2}}
                    }),
                    new TableCell({
                        children: [new Paragraph($this.$t('results.date'))],
                        margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                        borders: {top: {style: BorderStyle.INSET,size: 2}}
                    }),
                    new TableCell({
                        children: [new Paragraph($this.$t('results.mark'))],
                        margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                        borders: {top: {style: BorderStyle.INSET,size: 2}}
                    }),
                ],
            })
        );

        $this.results.forEach(r => {
            count_r++;
            rows.push(
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(String(count_r))],
                            margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                        }),
                        new TableCell({
                            children: [new Paragraph(r.user.lastname + ' ' + r.user.firstname + ' ' + r.user.patronymic)],
                            margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                        }),
                        new TableCell({
                            children: [new Paragraph( r.created_at )],
                            margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                        }),
                        new TableCell({
                            children: [new Paragraph(
                                String( $this.resultTypeService.convert(
                                            r.result.score,
                                            $this.$store.getters.stat_questionnaire.questions.length,
                                            $this.$store.getters.stat_questionnaire.result_type_id,
                                            $this.$store.getters.results_types,
                                        ) )
                            )],
                            margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                        }),
                    ],
                })
            );


        });

        const table = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: [8, 42, 30, 20],
            rows: rows
        });

        this.doc.addSection({
            properties: {},
            children: [ this.title, table ]
        });

        // To export into a .docx file
        this.saveDocumentToFile(this.doc, `${$this.$t('common.statistic')} - ${$this.title}.docx`);
    }

    exportQuestionnaire($this) {
        let rows = [];
        let count_q = 0;

        $this.questions.forEach(q => {
            count_q++;
            rows.push(
                new TableRow({
                    children: [
                        new TableCell({
                            columnSpan: 4,
                            children: [ new Paragraph({
                                children: [new TextRun({
                                    text: count_q + '. ' +q.question,
                                    bold: true,
                                    size: 20
                                })]
                            })],
                            margins: { top: convertInchesToTwip(0.2), bottom: convertInchesToTwip(0.1), left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                            borders: {
                                top: { style: BorderStyle.NONE},                                
                                left: { style: BorderStyle.NONE},
                                right: { style: BorderStyle.NONE}
                            }
                        })
                    ]
                })
            );

            
            if (q.variants.length){
                rows.push(                
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("№")],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                                borders: {top: {style: BorderStyle.INSET,size: 2}}
                            }),
                            new TableCell({
                                children: [new Paragraph($this.$t('worksheet.answer'))],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                                borders: {top: {style: BorderStyle.INSET,size: 2}}
                            }),
                            new TableCell({
                                children: [new Paragraph("%")],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                                borders: {top: {style: BorderStyle.INSET,size: 2}}
                            }),
                            new TableCell({
                                children: [new Paragraph("/")],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
                                borders: {top: {style: BorderStyle.INSET,size: 2}}
                            }),
                        ],
                    })
                );
            }

            let count_v = 0;
            q.variants.forEach(v => {
                count_v++;
                rows.push(
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph(String(count_v))],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                            }),
                            new TableCell({
                                children: [new Paragraph(v.variant)],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                            }),
                            new TableCell({
                                children: [new Paragraph( String($this.result[q.id][v.id].percent) )],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                            }),
                            new TableCell({
                                children: [new Paragraph($this.result[q.id][v.id].quotient)],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                            }),
                        ],
                    })
                );
            });

            if ($this.result[q.id]['other_answers']) {
                rows.push(
                    new TableRow({
                        children: [
                            new TableCell({
                                columnSpan: 4,
                                children: [ new Paragraph({
                                    children: [new TextRun({
                                        text: $this.$t('worksheet.other_answer'),
                                        bold: true,
                                        size: 20
                                    })]
                                })],
                                margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                            })
                        ],
                    })
                );

                let count_other = 0;
                $this.result[q.id]['other_answers'].forEach(item => {
                    count_other++;
                    rows.push(
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph(String(count_other))],
                                    margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                                }),
                                new TableCell({
                                    children: [new Paragraph(item)],
                                    margins: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) }
                                }),
                                new TableCell({children: []}),
                                new TableCell({children: []}),
                            ],
                        })
                    );
                });
            }
        });

        const table = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: [10, 70, 10, 10],
            rows: rows
        });

        this.doc.addSection({
            properties: {},
            children: [ this.title, table ]
        });

        // To export into a .docx file
        this.saveDocumentToFile(this.doc, `${$this.$t('common.statistic')} - ${$this.title}.docx`);
    }
}
  