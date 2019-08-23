import Vue from 'vue'
import Vuex from 'vuex'
import { gql } from 'apollo-boost'
import  { defaultClient as apolloclient } from './main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    getPosts: () =>{
      //use apollo client to fire getPosts query
      apolloclient
        .query({
          query: gql `
            query{
              getPosts {
                _id
                title
                imageUrl
              }
            }
          `
        }).then(data => {
          console.log(data);
        }).catch(err => {
          console.log(err)
        })
    }
  }
})
