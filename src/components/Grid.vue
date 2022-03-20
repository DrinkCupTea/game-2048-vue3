<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import GameManager from '../modules/GameManager';
import Tile from './Tile.vue';

const gameManager = ref(new GameManager())

const addTile = () => {
  gameManager.value.addRandomTile();
};

onMounted(() => {
  console.log("MOUNTED");
});
</script>

<template>
<div>
  <p id="title">2048</p>
  <div id="container">
    <div v-for="(row, row_index) in gameManager.grid.cells">
      <Tile v-for="(tile, tile_index) in row" :tile="tile">{{ tile?.value}}</Tile>
    </div>
  </div>
  <button type="button" @click="addTile">Add</button>

</div>
</template>

<style scoped lang="scss">
@import "../assets/scss/grid.scss";
</style>
