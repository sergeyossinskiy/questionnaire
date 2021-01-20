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
    if ( !this.$auth.check() ){      
      this.$auth.attempt( this.$route.query );
    }
  },
  mounted() {
    //console.log( this.$route.query );
  },
  methods: {
    open() {
      this.$auth.openSSOLogin( this.$route );
      //SSOService.openLogin(this.$route.query);
    }
  }
}
</script>