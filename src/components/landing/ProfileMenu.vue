<template>
    <div class="profile-menu">
        <Button icon="pi pi-user" class="p-button-raised p-button-rounded" @click="toggle"/>
        <Menu ref="menu" :model="actions" :popup="true" :key="isAuth"/>
    </div>
</template>

<script>
import Menu from 'primevue/menu';
import Button from 'primevue/button';

export default {
    name: 'ProfileMenu',
    components: {
        Menu,
        Button
    },
    data() {
		return {
            isAuth: this.$auth.check() 
        }
	},
    computed: {
        actions() {
            let items = {
                login: {
					label: this.$t('common.login'),
					command: () => {
						this.$auth.openSSOLogin();
					}
                },
                register: {
                    label: this.$t('common.register'),
                    command: () => {
						this.$auth.openSSORegister();
					}
                },
                logout: {
                    label: this.$t('common.logout'),
                    command: () => {
                        this.$auth.logout();
					}
                }
            };

            let enable_items = [];

            if ( this.$store.getters.isAuth ) {
                enable_items.push(items.logout);
            }
            else{
                enable_items.push(items.login, items.register);
            }

            return enable_items;
        }
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped lang="scss">


</style>
