<template>
  <v-container>
    <v-row class="mt-2" :style="$vuetify.breakpoint.lgAndUp ? 'margin-left:630px;max-width:485px' : ''">
      <v-col class="mt-2" cols="4">
        <p>Time: {{timeText}}</p>
      </v-col>
      <v-col class="mt-2" cols="4">
        <p>Matched: {{matched + '/' + cardPairs}} </p>
      </v-col>
      <v-col class="pl-0" cols="2">
         <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="reloadGame()" icon>
          <v-icon color="white">mdi-reload</v-icon>
        </v-btn>
      </template>
      <span>Reload Game</span>
    </v-tooltip>
      </v-col>
      <v-row class="ml-1">
      <v-col cols="3" v-for="card in shuffledCards" :key="card.color">
        <v-card @click="selectCard(card)" :class="card.class">
          <v-icon v-if="card.show" color="white">{{card.icon}}</v-icon>
        </v-card>
      </v-col>
      </v-row>
    </v-row>
    <confirm ref="confirm"></confirm>
  </v-container>
</template>

<script src="./game.js"></script>

<style scoped>
.card {
    height: 125px;
    width: 125px;
    background: #2e3d49;
    font-size: 0;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
}
.card.open {
   height: 125px;
    width: 125px;
    background: #2e3d49;
    font-size: 0;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02b3e4;
    cursor: default;
}

.card.match {
    cursor: default;
    background: #02ccba;
    font-size: 33px;
}
</style>
