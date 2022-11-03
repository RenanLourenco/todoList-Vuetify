
<template>
        <nav>
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
                

                <v-btn plain color="grey">
                    <span>sign out</span>
                    <v-icon right class="hidden-xs-and-down">mdi-logout</v-icon>
                </v-btn>
            </v-toolbar>

            <v-navigation-drawer v-model="drawer" app dark class="primary">
                <v-row class="mt-5" justify="center">
                    <v-avatar size="100">
                        <img src="/71199525.jpg" alt="">
                    </v-avatar>
                </v-row>
                <v-row justify="center">
                    <p class="white--text subheading mt-1">Renan Lourenço</p>
                </v-row>
                <v-row class="mt-5 mb-3" justify="center">
                    <PopUp />
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
</template>
<script>
import PopUp from './PopUp'

export default {
    components:  { PopUp } ,
    data(){ 
        return{
            drawer:true,
            links:[
                { icon:'view-dashboard', text:'Dashboard', route:'/' },
                { icon:'folder', text:'My Projects', route:'/projects' },
                { icon:'account', text:'Team', route:'/team' },
            ]
        }
    },
}
</script>