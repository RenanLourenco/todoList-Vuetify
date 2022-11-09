<template>
    <div class="team">
      <nav>

<v-snackbar v-model="snackbar" :timeout="4000" top color="success"  >
    <span>Novo projeto adicionado com sucesso</span>
    <v-btn plain color="white" @click="snackbar = false">Close</v-btn>
</v-snackbar>



<v-toolbar flat app color="grey lighten-4">
    <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <template>
    <div class="text-center">
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="grey"
            plain
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-menu</v-icon>
            <span>Menu</span>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
            v-for="link in links"
            :key="link.text"
            router :to="link.route"
            >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
    </div>
    </template>


    <!--Menu-->
    

    <v-btn plain color="grey" @click="signout">
        <span>sign out</span>
        <v-icon right class="hidden-xs-and-down">mdi-logout</v-icon>
    </v-btn>
</v-toolbar>

<v-navigation-drawer v-model="drawer" temporary app dark class="primary" >
    <v-row class="mt-5" justify="center">

    </v-row>
    <v-row justify="center">
        <p class="white--text subheading mt-1">
          <span class="font-weight-light">Todo</span>
          <span>Ninja</span>
        </p>
    </v-row>
    <v-row class="mt-5 mb-3" justify="center">
        <PopUp @projectAdded="snackbar=true" />
    </v-row>
    <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-action>
                <v-icon class="ma-2">mdi-{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</v-navigation-drawer>

</nav>
      <h1 class="subheading grey--text">Team</h1>
      <v-container class="my-5">
          <v-row wrap>
            <v-col cols="12" sm="8" md="6" xl="3" v-for="person in team" :key="person.name">
              <v-card class="text-sm-center ma-3 text-center">
              <v-responsive class="pt-4">
              </v-responsive>
              <v-card-text>
              <div class="subheading">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
              </v-card-text>
              <v-row justify="center" align="center">
              <v-card-actions >
                  <v-btn v-if="person.linkedin !== null" flat color="grey lighten-3">
                    <a :href="`https://www.linkedin.com/in/${person.linkedin}/`">
                    <v-icon small left light class=".text-underline-none">mdi-linkedin</v-icon>
                    <span id="linkedin">LinkedIn</span>
                    </a>
                </v-btn>
              </v-card-actions>
            </v-row>
            </v-card>
            </v-col>  
          </v-row>
        
      </v-container>
    </div>
</template>
<script>
import PopUp from '@/components/PopUp.vue'
import db from '@/fb'
export default {
  components:  { PopUp } ,
  data(){
    return{
      drawer:true,
            links:[
                { icon:'view-dashboard', text:'Dashboard', route:'/dashboard' },
                { icon:'folder', text:'My Projects', route:'/projects' },
                { icon:'account', text:'Team', route:'/team' },
            ],
            snackbar:false,
            user:null,
      team:[]
    }
  },
  methods:{
    signout(){
        this.$store.commit('auth/CLEAR_USER')
        this.$router.replace('/') 
      }
  },
  mounted(){
      db.collection('users').where('email','==',this.$store.state.auth.user)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                this.user = doc.data().name
            })
        })
        
    },
  created(){
    db.collection('users').onSnapshot((res)=>{
        const changes = res.docChanges()

        changes.forEach(change => {
          if(change.type === 'added'){
            this.team.push({
              ...change.doc.data(),
              id: change.doc.id
            
            })
          }
        })
      })
  }
}

</script>
<style>

a{
  text-decoration: none;
}

</style>