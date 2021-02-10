<template>
    <div class="p-grid auth-layout">
        <div class="p-col-12 p-md-8 p-md-offset-2">
            <router-view/>
        </div>        
    </div>
</template>

<script>

export default {
    name: 'ErrorLayout',
    components: {} 
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