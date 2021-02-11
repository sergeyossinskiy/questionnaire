<template>
    <div class="p-grid app-layout">
        <div class="p-col-12">
            <Menunav/>
            <div class="p-p-0 content">
                <div class="progress-spinner-wrapp">
                    <ProgressSpinner />
                </div>

                <router-view/>  
            </div>
        </div>
    </div>
  
</template>

<script>
import Menunav from "@/components/dashboard/Menunav.vue";
import ProgressSpinner from 'primevue/progressspinner';

export default {
    name: "DashboardLayout",
    data() {
        return {}
    },
    computed: {
    },
    components: {
        Menunav,
        ProgressSpinner
    }
}
</script>

<style scoped lang="scss">

    div.app-layout {
        margin-right: 0 !important;
        margin-left: 0!important;
        margin-top: 0!important;

        div[class*=p-col] {
            height: 100vh;
            padding: 0;
        }
    }

    .sidebar {
        border-right: 1px solid #f5f5f5;
    }

    .content {  
        position: relative;      
        background: #fafafa;
        overflow: hidden;
        overflow-y: auto;

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

    @media only screen and (max-width: 767px) {
        div.app-layout {
            div.content,
            div.sidebar {
                height: auto;
            }

            div.content {
                min-height: 400px;
            }
        }
    }
</style>