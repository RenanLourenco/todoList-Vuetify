<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Homepage</h1>
    <v-container class="my-5">

      
      <v-row class="mb-3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn small plain color="grey" @click="sortBy('titulo')" v-bind="attrs" v-on="on">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">By Project Name</span>
        </v-btn>
        </template>
        <span>Sort By Title</span>
        </v-tooltip>
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn small plain color="grey" @click="sortBy('responsavel')" v-bind="attrs" v-on="on">
          <v-icon left small>mdi-human</v-icon>
          <span class="caption text-lowercase">By Person </span>
        </v-btn>
        </template>
        <span>Sort by Person</span>
      </v-tooltip>
      
      </v-row>

      
      <v-card v-for="project in projects" :key="project.titulo" flat class="pa-3">
        <v-row wrap :class="`project ${project.status}`">
          <v-col cols="12" sm="12" md="6">
            <div class="caption grey--text">Project Title</div>
            <div>{{project.titulo}}</div>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <div class="caption grey--text">Responsible</div>
            <div>{{project.responsavel}}</div>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <div class="caption grey--text">Due by</div>
            <div>{{project.prazo}}</div>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <div>
              <v-chip :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
      

    </v-container>  
  </div>
</template>

<script>

  import lib from '../libraries/projects'
  export default {
    data(){
      return{
        projects: lib.projects
      }
    },
    
    methods:{
      sortBy(prop){
        this.projects.sort((a,b)=>a[prop] < b[prop] ? -1 : 1)
      },
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
</style>
