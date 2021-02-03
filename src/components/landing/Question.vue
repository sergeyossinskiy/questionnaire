<template>  

    <component :it="it" :variants="it.variants" :is="variantsType" :onSetAnswer='setAnswer'></component>
    
</template>

<script>
import { mapGetters } from 'vuex';
import { StringUtility } from "../../utilities";
import OneCorrect from './questions_types/OneCorrect';
import SeveralCorrect from './questions_types/SeveralCorrect';
import OpenWithOptions from './questions_types/OpenWithOptions';
import OpenWithoutOptions from './questions_types/OpenWithoutOptions';
import OpenWithSingleOption from './questions_types/OpenWithSingleOption';

export default {
    name: 'Sidebar',
    components: {
        OneCorrect,
        SeveralCorrect,
        OpenWithOptions,
        OpenWithoutOptions,
        OpenWithSingleOption
    },
    props: {
        it: Object,
        onSetAnswer: Function
    },
    data() {
		return {}
	},
    computed: {
        ...mapGetters(['lang']),
        variantsType() {
            return StringUtility.snakeToPascal(this.it.type.name);
        }
    },
    methods: {
        setAnswer: function(data) {
            this.onSetAnswer(data)
        }
    }
}
</script>


<style lang="scss">

    .variants {
        margin-bottom: 1rem;

        label {
            padding-left: 1rem;
        }
        
    }

    .variant_other {
        display: inline-block;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    input[type="text"] {
        width: 100%;
    }

</style>