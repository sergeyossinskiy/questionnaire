<template> 

 Test

</template>

<script>

export default {
    name: "Test",
    components: {},
    data() {
        return {}
    },
    computed: {
        lang() {
            return this.$store.getters.lang || this.$i18n.locale;
        }
    },
    methods: {
    },
    mounted() {    
    }
};
</script>

<style scoped lang="scss">
    
</style>
