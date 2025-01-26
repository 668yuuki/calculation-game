<template>
  <g :transform="`translate(${pos.x},${pos.y})  scale(${scale})`">
    <image :href="require('@assets/enemy.png')" height="50" width="50" id="enemy"/>
    <text x="0" y="35" font-family="Verdana" font-size="10" fill="yellow">
      {{ getQuestionText }}
    </text>
  </g>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "EnemyComponent",
  data: () => ({
    pos: {
      x: 200,
      y: 0,
    },
    centerOffset: {
      x: 0,
      y: 0,
    },
    scale: 1,
    enemyIntervalId: 0,
  }),
  computed: {
    ...mapGetters(["getQuestionText", "isInitEnemy", "isMoveEnemy"]),
  },
  mounted() {
    const path = document.querySelector("#enemy");
    if (!path) return;
    const bbox = path.getBBox();
    const centerOffset = this.centerOffset;
    centerOffset.x = 0;
    centerOffset.y = bbox.height;
    this.makeQuestion();
    this.updateEnemy({ pos: this.pos, centerOffset});
  },
  watch: {
    isInitEnemy(newVal) {
      if (newVal) {
        this.init();
        this.clearInitEnemyFlag();
      }
    },
    isMoveEnemy(newVal) {
      if (newVal) {
        this.moveEnemyTowardsPlayer();
        this.clearMoveEnemyFlag();
      }
    }
  },
  methods: {
    ...mapActions(["makeQuestion", "updateEnemy", "clearInitEnemyFlag", "clearMoveEnemyFlag"]),
    moveEnemyTowardsPlayer() {
      this.enemyIntervalId = setInterval(() => {
        const pos = this.pos;
        pos.x -= 25;
        pos.y += 1.5;
        this.scale += 0.3;
        const path = document.querySelector("#enemy");
        if (!path) return;
        const bbox = path.getBBox();
        const centerOffset = this.centerOffset;
        centerOffset.x = 0;
        centerOffset.y = bbox.height;
        this.updateEnemy({ pos: this.pos, centerOffset});
      }, 1000);
    },
    stopEnemyTowardsPlayer() {
      clearInterval(this.enemyIntervalId);
    },
    initPos() {
      const pos = this.pos;
      pos.x = 200;
      pos.y = 0;
      this.scale = 1;
    },
    init() {
      this.stopEnemyTowardsPlayer();
      this.initPos();
      this.makeQuestion();
      this.moveEnemyTowardsPlayer()
    },
  },
};
</script>
