<template>
  <div>
    <div> {{ score }} </div>
    <info-Display
      :info-display-status=infoDisplayStatus
      @gameStart="gameStart"
      @updateStatus="infoDisplayStatus=$event"
    />
    <svg>
      <ball
        v-if="isShowBall"
      />
      <player
        v-if="isShowPlayer"
        @click="throwBall()"
      />
      <enemy
        v-if="isShowEnemy"
      />
    </svg>
  </div>
</template>

<script>
import InfoDisplay from './InfoDisplay.vue'
import Ball from './charas/Ball.vue'
import Enemy from './charas/Enemy.vue'
import Player from './charas/Player.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "HomeStage",
  components: { InfoDisplay, Ball, Enemy, Player },
  data: () => ({
    isShowEnemy: true,
    isShowBall: true,
    isShowPlayer: true,
    infoDisplayStatus: "GAME_START",
    correctCount: 0,
  }),
  computed: {
    ...mapGetters(["getPlayerAnswer", "getEnemyAnswer", "isPlayerAndEnemyCollisionDetection", "isBallAndEnemyCollisionDetection"]),
    score() {
      return this.correctCount * 10
    },
  },
  created() {
    window.addEventListener("keydown", this.keyAction);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.keyAction);
  },
  watch: {
    isPlayerAndEnemyCollisionDetection(newVal) {
      if (!newVal) return;
      this.isShowEnemy = false;
      this.isShowBall =false;
      this.isShowPlayer = false;
      this.infoDisplayStatus = "GAME_OVER";
    },
    isBallAndEnemyCollisionDetection(newVal) {
      if (newVal) {
        this.isShowBall = false;
        const answer = Number(this.getPlayerAnswer);
        if (answer === this.getEnemyAnswer) {
          this.isShowEnemy = false;
          this.initEnemy();
          this.isShowEnemy = true;
          this.correctCount++;
          if (this.correctCount >= 10) {
            this.isShowEnemy = false;
            this.isShowBall =false;
            this.isShowPlayer = false;
            this.infoDisplayStatus = "GAME_CLEAR";
          }
        }
        this.initBall();
        this.isShowBall = true;
        this.updatePlayerAnswer("");
      }
    }
  },
  methods: {
    ...mapActions(["updatePlayerAnswer", "initEnemy", "initBall", "throwBall", "moveEnemy"]),
    gameStart() {
      this.moveEnemy();
      this.infoDisplayStatus=""
    },
    keyAction(e) {
      if(e.keyCode === 13) {
        this.throwBall();
        return;
      }
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        this.updatePlayerAnswer(this.getPlayerAnswer + String(e.keyCode -48))
      }
    },
  },
}
</script>
