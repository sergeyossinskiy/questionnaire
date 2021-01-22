<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script>
import { AppLayout, AuthLayout, ErrorLayout, EmptyLayout } from './layouts';

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'empty') + '-layout';
        }
    },
    components: {
        AppLayout, AuthLayout, ErrorLayout
    }
}
</script>

<style lang="scss">
    @import '~primevue/resources/themes/saga-blue/theme.css';
    @import '~primevue/resources/primevue.min.css';
    @import '~primeicons/primeicons.css';
    @import '~primeflex/primeflex.css';
    @import "~normalize.css";
    @import './assets/fonts/ubuntu/stylesheet.css';

    h1, h2, h3{
        color: var(--text-color);
    }

    h1{
        font-family: 'Ubuntu', sans-serif;
    }
</style>