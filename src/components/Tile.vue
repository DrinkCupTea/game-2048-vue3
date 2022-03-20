<script setup lang="ts">
import Tile from '../modules/Tile';

defineProps<{
  tile: Tile | null
}>();

</script>

<template>
<div
  v-if="tile !== null"
  :class="'position-' + tile.position.row + '-' + tile.position.column + ' tile-' + tile.value"
>{{ tile.value }}
</div>
</template>

<style scoped lang="scss">
@import "../assets/scss/tile.scss";
</style>
