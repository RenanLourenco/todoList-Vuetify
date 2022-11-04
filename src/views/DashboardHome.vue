<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Homepage</h1>
    <v-container class="my-5">

      
      <v-row class="mb-3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn small plain color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">By Project Name</span>
        </v-btn>
        </template>
        <span>Sort By Title</span>
        </v-tooltip>
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn small plain color="grey" @click="sortBy('responsible')" v-bind="attrs" v-on="on">
          <v-icon left small>mdi-human</v-icon>
          <span class="caption text-lowercase">By Person </span>
        </v-btn>
        </template>
        <span>Sort by Person</span>
      </v-tooltip>
      
      </v-row>

      
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
  export default {
    data(){
      return{
        projects: [],
        indices:[],
        status:null,
        items:['Completo','Desenvolvendo','Iniciar','Atrasado','Completo','Desenvolvendo','Atrasado','Iniciar']
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
