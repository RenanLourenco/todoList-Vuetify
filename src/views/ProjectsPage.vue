<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
        v-for="project in myProjects"
        :key="project.titulo"
        >
            <v-expansion-panel-header>
              {{project.titulo}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card>
                <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">due by {{project.responsavel}}</div>
              <div>info</div>
              </v-card-text>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      </v-container>
  </div>
</template>

<script>

import lib from '../libraries/projects'

export default{
  data(){
    return{
      lib
    }
  },
  computed:{
    myProjects(){
      let projects = this.lib.projects
      return projects.filter(project => {
        return project.responsavel === 'Renan Lourenço'
      })
    }
  }
}


</script>
