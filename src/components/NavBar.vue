
<template>
        <nav>
            <v-toolbar flat app color="grey lighten-4">
                <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title class="text-uppercase grey--text">
                    <span class="font-weight-light">Todo</span>
                    <span>Ninja</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-btn plain color="grey">
                    <span>sign out</span>
                    <v-icon right class="hidden-xs-and-down">mdi-logout</v-icon>
                </v-btn>
            </v-toolbar>

            <v-navigation-drawer v-model="drawer" app dark class="primary">
                <p class="error">test</p>
            </v-navigation-drawer>

        </nav>
</template>
<script>
export default {
    data(){
        return{
            drawer:true,
        }
    },
}
</script>