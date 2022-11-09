
<template>
  <div class="dashboard">
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
    <h1 class="subheading grey--text">Homepage</h1>
    <v-container class="my-5">
      
      
      <v-row class="mb-3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="projects.length >= 0 " small plain color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">By Project Name</span>
        </v-btn>
        </template>
        <span>Sort By Title</span>
        </v-tooltip>
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="projects.length >= 0 " small plain color="grey" @click="sortBy('responsible')" v-bind="attrs" v-on="on">
          <v-icon left small>mdi-human</v-icon>
          <span class="caption text-lowercase">By Person </span>
        </v-btn>
        </template>
        <span>Sort by Person</span>
      </v-tooltip>
      
      </v-row>

      <h1 v-if="projects.length == 0" class=".text-md-1 grey--text text-center" >Não há projetos :(</h1>
      <v-card v-for=" (project,index) in projects" :key="project.titulo" flat class="pa-3">
        
        <v-row wrap :class="`project ${project.status}`">
          <v-col cols="12" sm="12" md="6">
            <div class="caption grey--text">Project Title</div>
            <div>{{project.title}}</div>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <div class="caption grey--text">Responsible</div>
            <div>{{project.responsible}}</div>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <div>
              <v-chip :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
              
              
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{on,attrs}">
                  
                    <v-chip class="mx-2" small v-bind="attrs" v-on="on"><v-icon small>mdi-pencil</v-icon>
                    </v-chip>
                    
                  </template>
                  <v-card>
                    <v-card-title class="text h5 grey lighten-2">Edit status</v-card-title>
                    <v-form class="px-3" ref="form">
                      <v-select v-model="select" :items="items" item-text="status" item-value="abbr" label="Status"  single-line></v-select>
                      <v-btn plain id="submit-btn" class="mb-3 white--text caption" @click="project.status=select, dialog = false, indices.push(index),submit()">Edit</v-btn>
                    </v-form>
                    
                  </v-card>
              </v-dialog>
                
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>  
  </div>
</template>

<script>
  import db from '@/fb'
  import PopUp from '@/components/PopUp.vue'

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
        projects: [],
        indices:[],
        status:null,
        items:['Completo','Desenvolvendo','Iniciar','Atrasado','Completo','Desenvolvendo','Atrasado','Iniciar'],
        username:this.$route.params.username,
        user:null
        
        
      }
    },
    
    methods:{
      sortBy(prop){
        this.projects.sort((a,b)=>a[prop] < b[prop] ? -1 : 1)
      },
      submit(){
        var index = this.indices[this.indices.length - 1]
        var project = this.projects[index]
        db.collection('projects').doc(project.id).update({status:project.status})

      },
      signout(){
        this.$store.commit('auth/CLEAR_USER')
        this.$router.replace('/') 
      }
      
        
      //   var docRef = db.collection("projects").where("title", "==", project.title)

      //   docRef.get().then((doc) => {
      //     if (doc.exists) {
      //     console.log("Document data:", doc.data());
      //     } else {
      //     // doc.data() will be undefined in this case
      //     console.log("No such document!");
      //     }
      //     }).catch((error) => {
      //         console.log("Error getting document:", error);
      //     });
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

<style>
  .project.Completo{
    border-left:4px solid #0ff52d;

  }
  .project.Desenvolvendo{
    border-left:4px solid rgb(250, 246, 21);
    
  }
  .project.Iniciar{
    border-left:4px solid rgb(248, 32, 255);
    
  }
  .project.Atrasado{
    border-left:4px solid #c70000;
    
  }
  .v-chip.Completo{
    background: #3cd1c2 !important;
  }
  .v-chip.Desenvolvendo{
    background: #ffaa2c !important;
  }
  .v-chip.Atrasado{
    background:red !important;
  }
  .v-chip.Iniciar{
    background: #0ff52d !important;
  }
  #submit-btn{
    background: #0ff52d;
  }
</style>
