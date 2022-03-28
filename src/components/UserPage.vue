<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');

function login() {
  axios({
    method: 'POST',
    url: 'http://localhost:8080/login',
    params: {
      username: username.value,
      passwd: password.value
    }
  }).then((res) => {
    console.log(res);
  });
}

</script>

<template>
<div>
  <input type="text" name="username" v-model="username"/>
  <input type="password" name="password" v-model="password"/>
  <button @click="login">Login</button>
</div>
</template>

<style scoped lang="scss">
div {
  margin-top: 20px;
}

input {
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgba($color: #cccccc, $alpha: 0.7);
  border-style: none;
  border-radius: 5px;
}

button {

}

</style>
