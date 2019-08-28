import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { defaultClient as apolloClient } from './main'

import { GET_POSTS, SIGNIN_USER, SIGNUP_USER, GET_CURRENT_USER, ADD_POST } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null),
    setAuthError: (state, payload) => {
      state.authError = payload;
    }
  },
  actions: {
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            // First read the query you want to update
            const data = cache.readQuery({ query: GET_POSTS });
            //Create update data
            data.getPosts.unshift(addPost)
            //write updated data back to the query
            console.log(data)
            cache.writeQuery({
              query: GET_POSTS,
              data
            })
          },
          //optimistic response ensures data is added immediately as we specified for the udpate function
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              //to ensure no conflict and that it is added to the beginning of the array, id value of -1
              _id: -1,
              ...payload
            }
          }
        })
        .then(({ data }) => {
          console.log(data.addPost)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true)
      apolloClient.query({
        query: GET_CURRENT_USER
      })
        .then(({ data }) => {
          commit('setLoading', false)
          //Add user data to state
          commit('setUser', data.getCurrentUser)
          console.log(data.getCurrentUser)
        })
        .catch(err => {
          commit('setLoading', false)
          console.error(err)
        })
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true)
      //use apollo client to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          //Get data from actions to state via mutations
          //Commit will pass data from actions along to mutation function
          commit('setPosts', data.getPosts);
          commit('setLoading', false)
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false)
          localStorage.setItem('token', data.signinUser.token);
          //to make sure created method is run in main.js(we run getCurrentUser), reload the page
          router.go();
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.error(err)
        })
    },
    signupUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false)
          localStorage.setItem('token', data.signupUser.token);
          //to make sure created method is run in main.js(we run getCurrentUser), reload the page
          router.go();
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.error(err)
        })
    },
    signoutUser: async ({ commit }) => {
      //clear user in state
      commit('clearUser')
      //remove the token in localStorage
      localStorage.setItem('token', '')
      //end session
      await apolloClient.resetStore();
      //redirect home - kick users out of private pages (ie Profile)
      router.push('/')
    }
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  }
})
