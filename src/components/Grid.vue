<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GameManager from '../modules/GameManager';
import Tile from './Tile.vue';

const gameManager = ref(new GameManager());

function addTile() {
  gameManager.value.addRandomTile();
};

function keyHandler(event: KeyboardEvent) {
  const direction = gameManager.value.getDirection(event.key);
  if (direction === undefined) {
    return;
  }
  event.preventDefault();
  let moved: boolean = gameManager.value.move(direction);
  if (moved) {
    gameManager.value.merge();
    gameManager.value.addRandomTile();
  }
}

onMounted(() => {
  window.addEventListener('keyup', keyHandler);
});
</script>

<template>
<div>
  <p id="title">2048</p>
  <div id="container">
    <div v-for="(row, row_index) in gameManager.grid.cells" :key="row_index">
      <Tile
        v-for="(tile, tile_index) in row"
        :key="row_index + '_' + tile_index"
        :tile="tile"
      >{{ tile?.value}}</Tile>
    </div>
  </div>
  <button type="button" @click="addTile">Add</button>
</div>
</template>

<style scoped lang="scss">
@import "../assets/scss/grid.scss";
</style>
