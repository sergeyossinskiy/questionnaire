<template>
  <Button label="Submit" />
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Button from 'primevue/button';

export default {
  name: "Home",
  components: {
    HelloWorld,
    Button
  }
};
</script>
