<template>
    <div>
        <v-btn @click="firebaseQuery">clique</v-btn>
        <p>{{user}}</p>
    </div>
</template>
<script>
import db from '@/fb'

export default {
    data(){
        return{
            user:null,
            email:this.$store.getters.user
        }
    },

    computed:{
        exemplo(){
            return this.$store.getters.getUser
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
        
    }
}
</script>