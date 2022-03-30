<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import GameManager from '../modules/GameManager';
import Step from '../modules/Step'
import Tile from '../modules/Tile';
import Position from '../modules/Position';

defineProps<{
  gameManager: GameManager;
}>();

const username = ref('');
const password = ref('');
const isLogged = ref(false)

function login(gameManager: GameManager) {
  axios({
    method: 'POST',
    url: 'http://localhost:8080/login',
    params: {
      username: username.value,
      passwd: password.value
    }
  }).then((res) => {
    isLogged.value = res.data;
    if (isLogged.value) {
      gameManager.username = username.value;
    }
  });
}

function uploadGame(steps: Array<Step>) {
  axios({
    method: 'DELETE',
    url: 'http://localhost:8080/game'
  }).then((res) => {
    steps.forEach((step) => {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/game',
        params: {
          id        : step.id,
          tileRow   : step.tileRow,
          tileColumn: step.tileColumn,
          tileValue : step.tileValue,
          nextMove  : step.nextMove
        }
      }).then((res) => {
        console.log(res);
      });
    });
  });
}

async function replay(gameManager: GameManager) {
  gameManager.isReplaying= true;
  gameManager.setup();
  
  const steps: Array<Step> = await getAllSteps();
  let i = 1;
  actionStep(gameManager, steps[0]);
  const time = setInterval(() => {
    if (steps[i].nextMove === '') {
      clearInterval(time);
    }
    actionStep(gameManager, steps[i]);
    i += 1;
  }, 1000);
}

function actionStep(gameManager: GameManager, step: Step) {
  gameManager.addCerainTile(step.tileRow, step.tileColumn, step.tileValue);
  setTimeout(() => {
    if (step.nextMove !== '') {
      gameManager.move(step.nextMove);
    }
  }, 500);
}

async function getAllSteps(): Promise<Array<Step>> {
  const steps: Array<Step> = [];
  let id: number = 0;

  while (id !== -1) {
    console.log(id);
    let step = await getGameStep(id);
    step = step.data;

    const tileRow    = step.tileRow as number;
    const tileColumn = step.tileColumn as number;
    const tileValue  = step.tileValue as number;
    const nextMove   = step.nextMove as string;

    steps.push(new Step(id, tileRow, tileColumn, tileValue));
    steps[steps.length - 1].addNextMove(nextMove);

    id = nextMove === '' ? -1 : id + 1;
  }

  return steps;
}

function getGameStep(id: number) {
  return axios({
    method: 'GET',
    url: 'http://localhost:8080/game',
    params: {
      id: id
    }
  });
}
</script>

<template>
<div id="login" v-if="!isLogged">
  <input type="text" name="username" v-model="username"/>
  <input type="password" name="password" v-model="password"/>
  <button @click="login(gameManager)">Login</button>
</div>
<div id="logged" v-if="isLogged">
  <p>Welcome, {{ username }}!</p>
  <button @click="replay(gameManager)">Replay Game</button>
  <button v-if="gameManager.gameOver" @click="uploadGame(gameManager.steps)">Upload Game</button>
</div>
</template>

<style scoped lang="scss">
#login {
  margin-top: 20px;
  input {
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgba($color: #cccccc, $alpha: 0.7);
    border-style: none;
    border-radius: 5px;
  }
}

#logged {
  p {
    color: white;
    font-size: 25px;
    margin-bottom: 2px;
  }
  button {
    margin-top: 2px;
    margin-left: 7px;
    margin-right: 7px;
  }
}

button {
  color: white;
  padding: 5px;
  font-size: 15px;
  background-color: rgba($color: #cccccc, $alpha: 0.7);
  border-radius: 5px;
  border-style: none;
}
</style>
