<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height>
                <v-row justify="center" align="center">
                <v-col cols="12" sm="8" md="4" xl="4">
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>
                                <span class="font-weight-light">Todo</span>
                                <span>Ninja</span>
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <form ref="form" @submit.prevent="login()">
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
                                <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                                <p class="mt-3">Need a account? <router-link to="/register">Here</router-link></p>
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
import { mapState } from 'vuex'
export default{
    name:'LoginPage',
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
        login(){
            //login
            firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
                user => {
                    let userData = user.user.providerData[0]
                    this.$store.commit('auth/SET_USER', userData.email)
                    console.log(user.user.providerData[0])
                    this.$router.replace('/dashboard')  
                },
                err =>{
                    switch (err.code){
                        case "auth/user-not-found":
                            alert('Usuario não encontrado')
                            break;
                        case 'auth/wrong-password':
                            alert('Senha incorreta')
                            break;
                        default:
                            alert('Não foi possivel completar o login')
                    }
                }
            )
        }
    },
    computed:{
        ...mapState({
            user: state => state.auth.user,
        })
    }
}

</script>