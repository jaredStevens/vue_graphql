<template>
  <v-app>
    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="headline hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
        VueShare
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <!--Search Input -->
      <v-text-field flex prepend-icon="mdi-magnify" placeholder="Search Posts" color="accent" single-line hide-details>Search Posts</v-text-field>
      <v-spacer/>
      <!--Horizontal Navbar Links-->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon left class="hidden-sm-only">{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <main>
      <v-container style="margin-top: 50px">
      <router-view/>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home
  },
  computed: {
    horizontalNavItems(){
      return [
        {icon: 'mdi mdi-chat', title: 'Posts', link: '/posts'},
        {icon: 'mdi mdi-home-lock-open', title: 'Sign In', link: '/signin'},
        {icon: 'mdi mdi-login', title: 'Sign Up', link: '/signup'},
      ]
    }
  },
};
</script>
