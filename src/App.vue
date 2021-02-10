<template>
    <div class="p-progress-spinner-container">
        <ProgressSpinner />
    </div>  

    <component :is="layout">
        <router-view/>
    </component>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';
import { AppLayout, AuthLayout, ErrorLayout, WorksheetLayout, EmptyLayout } from './layouts';

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'empty') + '-layout';
        }
    },
    components: {
        ProgressSpinner, AppLayout, AuthLayout, WorksheetLayout, ErrorLayout
    },
    mounted() {
        this.$store.commit('readLevel');
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

    .p-progress-spinner-container {
        position: fixed;  
        display: none;
        height: 100vh;
        width: 100vw;  
        background: #fff;
        z-index: 9999;

        .p-progress-spinner {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>