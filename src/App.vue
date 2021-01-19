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
      // comsole.log(this.$http);
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
</style>