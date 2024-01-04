<template>
  {{ message }}
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      message: '',
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/hello')
      .then((response) => {
        this.message = response.data.message;
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
