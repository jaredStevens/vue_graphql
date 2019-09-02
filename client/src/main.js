import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import FormAlert from './components/Shared/FormAlert'

Vue.component('FormAlert', FormAlert)

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  uri: 'https://vueshare-jbs.herokuapp.com/graphql',
  // include auth token with requests made to backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    //if no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '')
    }
    //operation adds the token to the authorization header, which is sent to the backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError)
    }
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err)
        if (err.name === "AuthenticationError") {
          //set auth error in state (to show snackbar)
          store.commit('setAuthError', err)
          //signout user (to clear token)
          store.dispatch('signoutUser')
        }
      }
    }
  }
})

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    //execute getCurrentUser query
    this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')
