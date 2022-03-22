<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GameManager from '../modules/GameManager';
import Tile from './Tile.vue';

const gameManager = ref(new GameManager());

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
  <p id="score">score {{ gameManager.score }}</p>
  <div id="container">
    <div v-for="(row, row_index) in gameManager.grid.cells" :key="row_index">
      <Tile
        v-for="(tile, tile_index) in row"
        :key="row_index + '_' + tile_index"
        :tile="tile"
      >{{ tile?.value}}</Tile>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "../assets/scss/grid.scss";
</style>
