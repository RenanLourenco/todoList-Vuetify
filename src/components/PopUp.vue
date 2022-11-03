<template>
    <div class="text-center">
        <v-dialog max-width="600px">
            <template v-slot:activator="{on}">
            <v-btn class="success" v-on="on" dark>Add new Project</v-btn>
            </template>
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add New Project
                </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Titulo" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                    <v-text-field label="Responsavel" v-model="responsible" :rules="inputRules"></v-text-field>     
                    <v-menu max-width="290">
                        <template v-slot:activator="{on}">
                            <v-text-field :value="formattedDate" label="Prazo" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    <v-btn plain class="success mx-0 mt-3" @click="submit"> Add Project</v-btn>
                </v-form>
            </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import lib from "../libraries/projects";
import moment from 'moment'
export default{

    data(){
        return{
            title:'',
            responsible:'',
            due:null,
            projects: lib.projects,
            inputRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ]

        }
        
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){
            console.log(this.projects)
            this.projects.push({titulo:this.title,responsavel:this.responsible,prazo:this.formattedDate,status:'Iniciar'})
            }
            
        }
    },
    computed:{
        formattedDate(){
            return this.due ? moment(this.due).format('Do MMMM YYYY') : "";
        }
    }


}
</script>