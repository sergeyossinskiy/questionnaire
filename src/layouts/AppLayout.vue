<template>
    <div class="p-grid">
        <div class="p-col-12 p-md-4 p-lg-3">
            <Sidebar/>
        </div>
        <div class="p-col-12 p-md-8 p-lg-9 content">
            <router-view/>  
        </div>
    </div>
    <!-- <div id="nav">
        <router-link to="/home">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/profile">Profile</router-link>
    </div> -->
  
</template>

<script>
import Sidebar from "@/components/landing/Sidebar.vue";

export default {
    name: "AppLayout",
    components: {
        Sidebar
    }
}
</script>

<style lang="scss">

    div.p-grid {
        margin-right: 0 !important;
        margin-left: 0!important;
        margin-top: 0!important;

        div[class*=p-col] {
            height: 100vh;
            padding: 0;
        }
    }

    .content {        
        background: #fafafa;
        overflow: hidden;
        overflow-y: auto;
    }
</style>