<script setup lang="ts">
const name: String = "xie"
let array: Array<Number> = []
for (let i = 0; i < 16; i++) {
  array.push(i)
}
</script>

<template>
<div>
  <p id="title">2048</p>
  <div id="container">
    <div v-for="i in array"></div>
  </div>
</div>
</template>

<style scoped >
#container {
  /* Background Color */
  background-color: rgba(230, 230, 230, 0.75);
  /* Put it at center */
  margin-left: auto;
  margin-right: auto;
  /* Padding */
  padding-top: 1vw;
  padding-left: 1vw;
  /* Size of container */
  width: 32vw;
  height: 32vw;
  /* Gird */
  display: grid;
  grid: repeat(4, 8vw) / auto-flow 8vw;
  /* justify-items: center; */
  /* Radius */
  border-radius: 1vw;
}

#title {
  color: white;
  font-size: large;
}

#container > div {
  background-color: rgb(147, 187, 207);
  border-radius: 1vw;
  width: 7vw;
  height: 7vw;
}
</style>
