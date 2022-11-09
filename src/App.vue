<template>
<v-main class="grey">
  <v-app>
    
    <!-- <NavBar /> -->
    <v-content class="mx-4 mb-4">
        <router-view></router-view>
    </v-content>
  </v-app>
</v-main>
</template>

<script>
// import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  // components: {NavBar},
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.theme--light.v-application
{
    background: rgb(243, 243, 243);
}
</style>