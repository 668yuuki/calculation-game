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
        ref="ball"
        :isShowBall="isShowBall"
        :player-answer="playerAnswer"
        @updatePos="ballAndEnemyCollisionDetection"
      />
      <player
        v-if="isShowPlayer"
        ref="player"
        @click="moveBallTowardsEnemy"
      />
      <enemy
        v-if="isShowEnemy"
        ref="enemy"
        @updatePos="playerAndEnemyCollisionDetection"
      />
    </svg>
  </div>
</template>

<script>
import InfoDisplay from './InfoDisplay.vue'
import Ball from './charas/Ball.vue'
import Enemy from './charas/Enemy.vue'
import Player from './charas/Player.vue'

export default {
  name: "HomeStage",
  components: { InfoDisplay, Ball, Enemy, Player },
  data: () => ({
    isShowEnemy: true,
    isShowBall: true,
    isShowPlayer: true,
    infoDisplayStatus: "GAME_START",
    correctCount: 0,
    playerAnswer: ""
  }),
  computed: {
    enemyAnswer() {
      const enemy = this.$refs.enemy;
      return enemy.answer;
    },
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
  methods: {
    gameStart() {
      const enemy = this.$refs.enemy;
      enemy.moveEnemyTowardsPlayer();
      this.infoDisplayStatus=""
    },
    moveBallTowardsEnemy() {
      const ball = this.$refs.ball;
      ball.moveBallTowardsEnemy();
    },
    ballAndEnemyCollisionDetection() {
      const enemy =this.$refs.enemy
      if (!enemy) return;
      const enemyCenterPos = this.getCenterPos(enemy);
      const ball = this.$refs.ball;
      const ballCenter = this.getCenterPos(ball);
      if (ballCenter.y < enemyCenterPos.y) {
        this.isShowBall = false;
        const answer = Number(this.playerAnswer);
        if (answer === this.enemyAnswer) {
          this.isShowEnemy = false;
          enemy.init();
          this.isShowEnemy = true;
          this.correctCount++;
          if (this.correctCount >= 10) {
            this.isShowEnemy = false;
            this.isShowBall =false;
            this.isShowPlayer = false;
            this.infoDisplayStatus = "GAME_CLEAR";
          }
        }
        ball.init();
        this.isShowBall = true;
        this.playerAnswer = "";
      }
    },
    playerAndEnemyCollisionDetection() {
      const enemy =this.$refs.enemy
      if (!enemy) return;
      const enemyCenterPos = this.getCenterPos(enemy);
      const player = this.$refs.player;
      const playerCenter = this.getCenterPos(player);
      if ((playerCenter.x > enemyCenterPos.x) && (playerCenter.y > enemyCenterPos.y)) {
        this.isShowEnemy = false;
        this.isShowBall =false;
        this.isShowPlayer = false;
        this.infoDisplayStatus = "GAME_OVER";
      }
    },
    throwBall() {
      this.moveBallTowardsEnemy();
    },
    getCenterPos(component) {
      const pos = component.pos;
      const centerOffset = component.centerOffset
      return { x: pos.x + centerOffset.x, y: pos.y + centerOffset.y }
    },
    keyAction(e) {
      if(e.keyCode === 13) {
        this.moveBallTowardsEnemy();
        return;
      }
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        this.playerAnswer = this.playerAnswer + String(e.keyCode -48);
      }
    },
  },
}
</script>
