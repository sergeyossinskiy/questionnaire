<template>

    <Card class="not-found">
        <template #header>
            <img alt="require-auth" src="@/assets/ills/404.svg">
        </template>
        <template #title>
            <h1>404</h1> 
        </template>
        <template #content>
            {{ $t('common.errors.404_descript') }}.
        </template>
        <template #footer>
            <Button :label="$t('common.to_home')" @click="$router.push({name: 'Home'})" />
        </template>
    </Card>
  
</template>

<script>
import Button from 'primevue/button';
import Card from 'primevue/card';

export default {
    name: 'Login',
    components: {
        Card,
        Button
    },
    methods: {}
}
</script>

<style lang="scss" scoped>

    .not-found {
      margin-top: 2rem;

      h1{
          margin: 0;
      }
    }
    .p-card-header img {
        display: block;
        width: 350px;
        height: 330px;
        margin: 0 auto;
    }

    ::v-deep(.p-card-body){
        text-align: center;
        padding-bottom: 3rem;
    } 
</style>