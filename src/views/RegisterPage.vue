<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height>
                <v-row justify="center" align="center">
                <v-col cols="12" sm="8" md="4" xl="4">
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Signup</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>

                            <form ref="form" @submit.prevent="register()">
                                <v-text-field
                                v-model="username"
                                name="username"
                                label="Username"
                                type="text"
                                placeholder="Username"
                                required
                                >
                                
                                </v-text-field>
                                <v-text-field
                                v-model="role"
                                name="role"
                                label="Role"
                                type="text"
                                placeholder="Role"
                                required
                                >
                                </v-text-field>
                                <v-text-field
                                v-model="linkedin"
                                name="linkedin"
                                label="LinkedIn"
                                type="text"
                                placeholder="Insira aqui @ do LinkedIn (Opcional)"
                                >
                                </v-text-field>
                                <v-text-field
                                v-model="email"
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Email"
                                required
                                >
                                </v-text-field>
                                <v-text-field
                                v-model="password"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="password"
                                required
                                ></v-text-field>
                                <v-btn type="submit" class="mt-4" color="primary" value="log in">SIGNUP </v-btn>
                                <p class="mt-3">Have an Account? <router-link to="/">here</router-link></p>
                                
                            </form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import db from '@/fb'
export default{
    name:'RegisterPage',
    data(){
        return{
            username:'',
            role:'',
            email:'',
            password:'',
            linkedin:null,
            avatar:null,
        }
    },
    methods:{
        register(){
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(
                user => {
                    const createdUser = {
                        name:this.username,
                        role:this.role,
                        email:this.email,
                        linkedin:this.linkedin
                    }
                    db.collection('users').add(createdUser).then(()=>{
                        console.log('user created')
                        let userData = user.user.providerData[0]
                        this.$store.commit('auth/SET_USER', userData.email)
                        this.$router.replace('/dashboard') 
                    })
                },
                err =>{
                    alert(err)
                }
            )
        }
    }
}

</script>