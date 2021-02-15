<template>

    <div class="input-multi-lang">
        <div v-for="locale in locales" :key="locale" class="p-inputgroup">
            <span class="p-inputgroup-addon" @click="setLocale(locale)">
                {{ locale.toUpperCase() }}
            </span>
            <InputText placeholder="Username" :name="'input-' + name + '-' + locale"  @input="onInputChanges" v-model="value[locale]"/>
        </div>
    </div>

</template>

<script>
import _ from 'lodash';
import InputText from 'primevue/inputtext';
import { locales } from '@/config/locale.config';

export default {
    name: 'InputMultiLang',
    components: {
        InputText
    },
    props: {
        name: String,
        changeTitle: Function
    },
    data() {
		return {
            locales: locales,
            value: {}
        }
	},
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        }
    },
    methods: {
        setLocale(locale) {
            this.locales.forEach(lc => {
                let active_input = document.querySelector(`[name='input-${this.name}-${lc}']`);
                if (active_input){
                    active_input.classList.remove('active');
                    active_input.parentNode.classList.remove('active');
                }
            });
            this.setInputActiv(locale);
        },
        setInputActiv(locale) {
            let active_input = document.querySelector(`[name='input-${this.name}-${locale}']`);
            if (active_input){
                active_input.classList.add('active');
                active_input.parentNode.classList.add('active');
            }
        },
        onInputChanges: _.debounce(function() {
            this.changeTitle('title', this.value);
        },500)
    },
    mounted() {
        this.setInputActiv(this.lang);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .input-multi-lang {
        display: flex;
        justify-content: stretch;

        .p-inputgroup {
            width: 100%;

            .p-inputgroup-addon {
                border-radius: 0;
                border-radius: 0; 
            } 

            .p-inputtext {
                border-radius: 0;
                border-radius: 0; 
                border-right: none;
            }            
        }

        .p-inputgroup:first-child {
            .p-inputgroup-addon {
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px; 
            }        
        }

        .p-inputgroup:last-child {
            .p-inputtext {
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                border-right: 1px solid #ced4da; 
            }        
        }
        
    }

    @media only screen and (max-width: 767px) {
        .input-multi-lang {
            .p-inputgroup-addon {
                cursor: pointer;
            }

            .p-inputgroup {
                width: auto;

                .p-inputtext {
                    width: 0;
                    padding: 0;
                } 

                .p-inputtext.active {
                    width: 100%;
                    padding: 0.5rem;
                }           
            }

            .p-inputgroup.active {
                width: 100%;
            }         
        }
    }

</style>
