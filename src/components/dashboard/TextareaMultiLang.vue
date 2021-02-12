<template>

    <div class="textarea-multi-lang">
        <div v-for="locale in locales" :key="locale" class="p-inputgroup">
            <span class="p-inputgroup-addon" @click="setLocale(locale)">
                {{ locale.toUpperCase() }}
            </span>
            <Textarea :autoResize="true" rows="2" cols="30" :name="'input-' + name + '-' + locale" />
        </div>
    </div>

</template>

<script>
import Textarea from 'primevue/textarea';
import { locales } from '@/config/locale.config';

export default {
    name: 'TextareaMultiLang',
    components: {
        Textarea
    },
    props: {
        name: String
    },
    data() {
		return {
            locales: locales
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
        }
    },
    mounted() {
        this.setInputActiv(this.lang);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .textarea-multi-lang {
        display: flex;
        justify-content: stretch;

        .p-inputgroup {
            width: 100%;

            .p-inputgroup-addon {
                border-radius: 0;
                border-radius: 0; 
            } 

            .p-inputtextarea {
                border-radius: 0;
                border-radius: 0; 
                border-right: none;
                height: 100%;
            }            
        }

        .p-inputgroup:first-child {
            .p-inputgroup-addon {
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px; 
            }        
        }

        .p-inputgroup:last-child {
            .p-inputtextarea {
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                border-right: 1px solid #ced4da; 
            }        
        }
        
    }

    @media only screen and (max-width: 767px) {
        .textarea-multi-lang {
            .p-inputgroup-addon {
                cursor: pointer;
            }

            .p-inputgroup {
                width: auto;

                .p-inputtextarea {
                    width: 0;
                    padding: 0;
                    height: 100% !important;
                } 

                .p-inputtextarea.active {
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
