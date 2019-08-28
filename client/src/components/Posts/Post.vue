<template>
  <v-container v-if="getPost" pt-5 mt-5 style="text-align: center;">
    <!--Post Card -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{getPost.title}}</h1>
            <v-btn large icon v-if="user"></v-btn>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GET_POST } from "../../queries"
import { mapGetters } from 'vuex'

export default {
  name: "Post",
  props: [
    'postId'
  ],
  apollo: {
    getPost: {
      query: GET_POST,
      variables() {
        return {
          postId: this.postId
        }
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
}
</script>
