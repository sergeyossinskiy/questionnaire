<template>
    <div class="profile-menu">
        <Button icon="pi pi-book" class="p-button-raised" @click="toggle"/>
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
        userName() {
            let user = this.$store.getters.levelData.user;
            return user.lastname + " " + user.firstname; 
        },
        modules() {
            return this.$store.getters.levelData.modules;
        },
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

            return this.initItemsMenu( items );
        }
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        initItemsMenu( items ) {
            let enable_items = [];

            if ( this.$store.getters.isAuth ) {
                enable_items.push({                        
                        label: this.userName,
                        style: "font-size: 14px;",
                        disabled: true
                });

                this.modules.forEach(module => {
                    enable_items.push({
                        label: this.$t(`modules.${module.replace('quiz_', '')}`),
                        to: `/${module.replace('quiz_', '')}`
                    });
                });

                enable_items.push(items.logout);
            }
            else{
                enable_items.push(items.login, items.register);
            }

            return enable_items;
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">


</style>
