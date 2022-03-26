<script setup lang="ts">
import Tile from '../modules/Tile';

defineProps<{
  tile: Tile
}>();

const emit = defineEmits(['after-move']);

function afterMove(tile: Tile) {
  emit('after-move', tile);
}

</script>

<template>
<transition
  :name="tile.animationName"
  @after-leave="afterMove(tile)"
>
  <div
    v-show="tile.show"
    :class="`tile-${tile.value} position-row-${tile.position.row} position-column-${tile.position.column}`"
  >
  {{ tile.value }}
  </div>
</transition>
</template>

<style scoped lang="scss">
@import "../assets/scss/tile.scss";
</style>
