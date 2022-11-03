<template>
    <div class="text-center">
        <v-dialog max-width="600px" v-model="dialog">
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
                    <v-textarea label="Conteudo" v-model="content" :rules="inputRules"></v-textarea>
                    <v-text-field label="Responsavel" v-model="responsible" :rules="inputRules"></v-text-field>     
                    <v-menu max-width="290">
                        <template v-slot:activator="{on}">
                            <v-text-field :value="formattedDate" label="Prazo" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    <v-btn plain class="success mx-0 mt-3" @click="submit" :loading="loading"> Add Project</v-btn>
                </v-form>
            </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import lib from "../libraries/projects";
import moment from 'moment'
import db from '@/fb'
export default{

    data(){
        return{
            title:'',
            responsible:'',
            due:null,
            projects: lib.projects,
            inputRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            loading: false,
            dialog:false,
        }
        
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){
            this.loading = true;

            const project = {
                title:this.title,
                content:this.content,
                due:moment(this.due).format('Do MMMM YYYY'),
                responsible:this.responsible,
                status:'Iniciar'
            }
            db.collection('projects').add(project).then(()=>{
                this.loading = false
                this.dialog = false
            })

            // this.projects.push({titulo:this.title,responsavel:this.responsible,prazo:this.formattedDate,status:'Iniciar'})
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