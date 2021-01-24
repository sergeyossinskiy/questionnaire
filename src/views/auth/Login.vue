<template>
  <p>loginPage</p>
  <Button label="Login" @click="open" />
</template>

<script>
import Button from 'primevue/button';

export default {
  name: 'Login',
  components: {
    Button
  },
  beforeCreate: function(){
    if ( !this.$store.getters.isAuth ){      
      this.$auth.attempt( this.$route.query );
    }
  },
  methods: {
    open() {
      this.$auth.openSSOLogin();
    }
  }
}
</script>