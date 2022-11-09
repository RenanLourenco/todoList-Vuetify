<template>
  <div class="projects">
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
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
        v-for="project in myProjects"
        :key="project.title"
        >
            <v-expansion-panel-header>
              {{project.title}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card>
                <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">Criado por {{project.responsible}}</div>
              <div>{{project.content}}</div>
              </v-card-text>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <h1 v-if="projects.length == 0" class=".text-md-1 grey--text text-center" >Não há projetos :(</h1>
      </v-container>
  </div>
</template>

<script>

import db from '@/fb'
import PopUp from '@/components/PopUp.vue'
export default{
  components:  { PopUp } ,
  data(){
    return{
      projects: [],
      drawer:true,
            links:[
                { icon:'view-dashboard', text:'Dashboard', route:'/dashboard' },
                { icon:'folder', text:'My Projects', route:'/projects' },
                { icon:'account', text:'Team', route:'/team' },
            ],
            snackbar:false,
            user:null,
    }
  },
  computed:{
    myProjects(){
      return this.projects.filter(project => {
        return project.responsible === this.user
      })
    }
  },
  methods:{
    signout(){
        this.$store.commit('auth/CLEAR_USER')
        this.$router.replace('/') 
      }
  },
  created() {
      db.collection('projects').onSnapshot((res)=>{
        const changes = res.docChanges()

        changes.forEach(change => {
          if(change.type === 'added'){
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
    },
    mounted(){
      db.collection('users').where('email','==',this.$store.state.auth.user)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                this.user = doc.data().name
            })
        })
        
    }
}


</script>
