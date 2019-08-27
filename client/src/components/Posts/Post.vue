<template>
  <v-container v-if="getPost" class="mt-3" flexbox center>
    <h1>{{getPost.title}}</h1>
  </v-container>
</template>

<script>
import { GET_POST } from "../../queries"

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
  }
}
</script>
