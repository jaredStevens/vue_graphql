<template>
  <v-container  pt-5 mt-5 style="text-align: center;">
    <!--Signin Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-3>
        <h1>Welcome Back</h1>
      </v-flex>
    </v-layout>
    <!--Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-3>
        <v-card class="pa-2 ma-2" color="secondary" dark>
          <v-container>
            <v-form @submit.prevent="handleSigninUser">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="username" prepend-icon="face" label="User Name" type="text" required autocomplete="off">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="password" prepend-icon="extension" label="Password" type="password" required autocomplete="off">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn color="accent" type="submit">Submit</v-btn>
                  <h3>Don't have an account?
                  <router-link to="/signup">Signup</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Signin',
  data() {
    return {
      username: "",
      password: ""
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user(value) {
      //if user value changes, redirect to home page
      if(value) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch('signinUser', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
