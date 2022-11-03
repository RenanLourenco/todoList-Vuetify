<template>
    <div class="team">
      <h1 class="subheading grey--text">TEAM PAGE</h1>
      <v-container class="my-5">
          <v-row wrap>
            <v-col cols="12" sm="8" md="6" xl="3" v-for="person in team" :key="person.name">
              <v-card class="text-sm-center ma-3 text-center">
              <v-responsive class="pt-4">
                <v-avatar size="100">
                <img :src="person.avatar">
                </v-avatar>
              </v-responsive>
              <v-card-text>
              <div class="subheading">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="grey lighten-3">
                  <v-icon small left light>mdi-email</v-icon>
                  <span>Message</span>
                </v-btn>
              </v-card-actions>
            </v-card>
            </v-col>  
          </v-row>
        
      </v-container>
    </div>
</template>
<script>
export default {
  data(){
    return{
      team:[
        {name:"Renan de Melo Lourenço", role:"Web Developer", avatar:"/71199525.jpg"},
        {name:"Renan de Melo Lourenço", role:"Back end developer", avatar:"/71199525.jpg"},
        {name:"Renan de Melo Lourenço", role:"Front end developer", avatar:"/71199525.jpg"},
        {name:"Renan de Melo Lourenço", role:"DevOps engineer", avatar:"/71199525.jpg"},
        {name:"Renan de Melo Lourenço", role:"Cloud engineer", avatar:"/71199525.jpg"}
      ]
    }
  }
}

</script>
  