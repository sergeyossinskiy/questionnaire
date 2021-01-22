<template>
    <div class="language-switcher">
        <Button icon="pi pi-globe" class="p-button-raised p-button-rounded" @click="toggle"/>
        <Menu ref="langMenu" :model="items" :popup="true" />
    </div>
</template>

<script>
import Menu from 'primevue/menu';
import Button from 'primevue/button';

export default {
    name: 'LanguadeSwitcher',
    components: {
        Menu,
        Button
    },
    data() {
		return {
			items: [
				{
					label: 'Рус',
					command: () => {
						this.$auth.openSSOLogin();
					}
				},
				{
                    label: 'Каз',
                    command: () => {
						this.$auth.openSSORegister();
					}
                }
			]
		}
	},
    computed: {
        
    },
    methods: {
        toggle(event) {
            this.$refs.langMenu.toggle(event);
        }
    },
    async mounted() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
