<template>

    <Card class="result">
        <template #header>
            <img alt="require-auth" src="@/assets/ills/require-auth.svg">
        </template>
        <template #title>
            {{ $t('common.auth_required') }}!
        </template>
        <template #content>
            {{ $t('common.auth_required_descript') }}.
        </template>
        <template #footer>
            <Button :label="$t('common.login')" @click="open" />
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

<style lang="scss" scoped>
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