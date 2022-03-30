<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import GameManager from '../modules/GameManager';
import Tile from '../modules/Tile';
import GameTile from './GameTile.vue';
import UserPage from './UserPage.vue';

const gameManager: Ref<GameManager> = ref(new GameManager());

function tileAfterMove(tile: Tile) {
  gameManager.value.afterMove(tile);
}

function isAvaliableKey(key: string): boolean {
  return key === 'ArrowUp'
      || key === 'ArrowDown'
      || key === 'ArrowLeft'
      || key === 'ArrowRight';
}

function keyHandler(event: KeyboardEvent) {
  if (gameManager.value.gameOver || !isAvaliableKey(event.key)) {
    return;
  }
  event.preventDefault();
  gameManager.value.move(event.key);
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
    <GameTile
      v-for="tile in gameManager.grid.tiles"
      :key="tile.id.toString()"
      :tile="tile"
      @after-move="tileAfterMove(tile)"
    >
    </GameTile>
  </div>
  <div id="gameOver" v-if="gameManager.gameOver">
    <button @click="gameManager.setup"><span>Restart </span></button>
  </div>
  <UserPage :gameManager="gameManager"></UserPage>
</div>
</template>

<style scoped lang="scss">
@import "../assets/scss/grid.scss";
</style>
