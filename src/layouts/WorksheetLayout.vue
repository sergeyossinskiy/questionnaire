<template>
    <div class="p-grid layout">
        <div class="p-col-12 p-md-10 p-md-offset-1 content">
            <div class="progress-spinner-wrapp">
                <ProgressSpinner />
            </div>

            <router-view/>  
        </div>
    </div>
  
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';

export default {
    name: "WorksheetLayout",
    components: {
        ProgressSpinner
    }
}
</script>

<style scoped lang="scss">

    div.layout {
        position: relative;   
        height: 100vh;   
        margin-right: 0 !important;
        margin-left: 0!important;
        margin-top: 0!important;
        overflow: hidden;
        overflow-y: auto;
        background: #fafafa;
    }

    .content { 
        padding-top: 2rem;
        
        .progress-spinner-wrapp {
            position: absolute;  
            display: none;
            height: 100%;
            width: 100%;  
            background: #fff;
            z-index: 9909;

            .p-progress-spinner {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>