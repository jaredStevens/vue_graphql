<template>
  <v-app style="background: #E3E3EE">
    <v-navigation-drawer app temporary absolute v-model="sideNav">
      <v-app-bar color="secondary" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav">
        </v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-app-bar>
      <v-divider/>
      <!-- Side NavBar Links -->
      <v-list>
      <v-list-item v-for="item in sideNavItems" :key="item.title" :to="item.link">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          {{item.title}}
        </v-list-item-content>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
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
        <transition name="fade">
      <router-view/>
      </transition>
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
  data () {
    return {
      sideNav: false,
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav
    }
  },
  computed: {
    horizontalNavItems(){
      return [
        {icon: 'chat', title: 'Posts', link: '/posts'},
        {icon: 'lock_open', title: 'Sign In', link: '/signin'},
        {icon: 'create', title: 'Sign Up', link: '/signup'},
      ]
    },
    sideNavItems(){
      return [
        {icon: 'chat', title: 'Posts', link: '/posts'},
        {icon: 'lock_open', title: 'Sign In', link: '/signin'},
        {icon: 'create', title: 'Sign Up', link: '/signup'},
      ]
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
