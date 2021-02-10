<template>

    <div class="bg-svg">
        <img alt="user header" src="../assets/ills/home.svg">
    </div>   
  
</template>

<script>
export default {
  name: "Home",
  components: {
  },
  methods: {}
};
</script>

<style scoped lang="scss">
    .bg-svg {
        height: 100%;
        background-color: #7cb2f599;

        img {
            height: 100%;
            max-width: 500px;
            margin: auto;
            display: block;
        }
    }

    @media only screen and (max-width: 767px) {
        .bg-svg {
            padding: 2.9rem 0;
            img {
                height: auto;
                max-width: 300px;
            }
        }
    }
</style>
