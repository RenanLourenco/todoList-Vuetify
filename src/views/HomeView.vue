<template>
  <div class="home">
    <h1>Homepage</h1>

    <v-btn class="pink white--text">Click</v-btn>
    <v-btn depressed color="pink" class="ma-4">Click</v-btn>
    <v-btn plain color="pink">Click</v-btn>

    <v-btn depressed class="pink white--text ma-2">
      <v-icon left>mdi-apps</v-icon>
      <span>aplicativos</span>
    </v-btn>

    <v-btn depressed x-large class="pink white--text">
      <span>me envie um email</span>
      <v-icon right large>mdi-email</v-icon>
    </v-btn>

    <v-btn fab depressed x-small dark color="purple" class="ma-1">
      <v-icon small>mdi-heart</v-icon>
    </v-btn>

  </div>
</template>

<script>


  export default {

  }
</script>
