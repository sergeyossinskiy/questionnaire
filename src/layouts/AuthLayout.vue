<template>
    <div class="p-grid auth-layout">
        <div class="p-col-12">            
            <Button icon="pi pi-home" class="p-button-raised p-button-rounded" @click="toHome"/>                
        </div> 
        <div class="p-col-12 p-md-8 p-md-offset-2">
            <router-view/>
        </div>        
    </div>
</template>

<script>
import Button from 'primevue/button';

export default {
    name: 'AuthLayout',
    components: {
        Button
    },
    methods: {
        toHome (event){
            this.$router.push({ name: "Home"});
        }
    }   
}
</script>

<style scoped lang="scss">

    div.auth-layout {
        margin-right: 0 !important;
        margin-left: 0!important;
        margin-top: 0!important;

        div[class*=p-col] {
            padding: 0;
        }

        button {
            margin: 2rem 0 0 2rem;
        }
    }
    
</style>