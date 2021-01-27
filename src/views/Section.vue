<template> 

    <DataView :value="worksheets" :layout="layout">
        <template #header>
            <div class="p-grid p-nogutter">
                <div class="p-col-6" style="text-align: left">
                   <h3>{{ $t('section.test_and_questions') }}</h3>
                </div>
                <div class="p-col-6" style="text-align: right">
                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </div>
        </template>
        <template #list="slotProps">
            <div class="p-col-12">
                <div class="item-details">
                    <div class="item-info">
                        <img src="@/assets/ills/test.png" alt="test"/>
                        <div class="p-grid">
                            <div class="p-col-12"><strong>{{ $filters.translate( slotProps.data.title,  lang ) }}</strong></div>
                            <div class="p-col-12">{{ $filters.translate( slotProps.data.description,  lang ) }}</div>
                            <div class="p-col-12"><i class="secondary-text">{{ $t(`common.updated`) }}: {{ $filters.date( slotProps.data.updated_at ) }}</i></div>
                        </div>
                    </div>
                    <Button @click="openWorksheet(slotProps.data)">{{ $t('section.take_test') }}</Button>
                </div>
            </div>
        </template>
        <template #grid="slotProps">
            <div style="padding: .5em" class="p-col-12 p-md-3">
                <Panel :header="$filters.translate( slotProps.data.title,  lang )" style="text-align: center">
                    <img src="@/assets/ills/test.png" alt="test"/>
                    <div class="item-detail">
                        {{ $filters.translate( slotProps.data.description,  lang )  }} -
                        <i class="secondary-text"> {{ $t(`common.updated`) }}: 
                        {{ $filters.date( slotProps.data.updated_at ) }} </i>
                    </div>
                    <Button>{{ $t('section.take_test') }}</Button>
                </Panel>
            </div>
        </template>
    </DataView>

</template>

<script>
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import { GuardsService } from '../services';
import { mapGetters } from 'vuex';

export default {
    name: "Section",
    components: {
        DataView,
        DataViewLayoutOptions,
        Dropdown,
        Panel,
        Button
    },
    data() {
        return {        
            layout: 'list',
        }
    },
    computed: {
        ...mapGetters(['lang']),
        current_section() {
            return this.$route.params.name_section;
        },
        worksheets() {
            if ( !this.$store.getters.worksheets[this.current_section] ) {
                let spinner = document.querySelector('.progress-spinner-wrapp');
                if (spinner) spinner.style.display = 'block';
                this.$store.dispatch('fetchWorksheetForSection', this.current_section).then(() => {
                    if (spinner) spinner.style.display = 'none';
                });
            }
            else{
                return this.$store.getters.worksheets[this.current_section];
            }            
        }
    },
    methods: {
        openWorksheet(worksheet) {
            let guards = this.$store.getters.requirements[this.current_section];
            guards = guards.filter((el) => {
                return el.worksheet_id == worksheet.id
            });

            guards = guards.map((el) => {
                return el = el.name;
            });
            let to = { path: `/worksheet/${worksheet.id}`,name: "Worksheet", params: { "id_worksheet": worksheet.id} };
            GuardsService.callChain(guards, to, this.$route, this.$router.push);
            //this.$router.push( { name: "Worksheet", params: { "id_worksheet": worksheet.id} } );
        }
    },
    async mounted() {
        if ( !this.$store.getters.worksheets[this.current_section] ) {
            document.querySelector('.progress-spinner-wrapp').style.display = 'block';
            await this.$store.dispatch('fetchWorksheetForSection', this.current_section);
            document.querySelector('.progress-spinner-wrapp').style.display = 'none';
        }
    }
};
</script>

<style scoped lang="scss">
    h3 {
        margin: 0.5rem 0;
    }

    .secondary-text {
        font-size: 14px;
        color: #aaaaaa;
    }

    .item-details {
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;

        .item-info {
            display: flex;
            justify-content: space-around;

            div {
                margin-left: 1rem;
                margin-right: 1rem;
            }
        }

        img {
            max-height: 64px;
        }

        .p-button {
            min-width: 130px;
            width: auto;
            align-self: flex-start;
        }
    }
</style>
