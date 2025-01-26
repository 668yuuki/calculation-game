<template>
  <g :transform="`translate(${pos.x},${pos.y})`">
    <image :href="require('@assets/fireBall.png')" height="20" width="20" id="ball"/>
    <text x="-10" y="-10" font-family="Verdana" font-size="10" fill="red">
      {{ getPlayerAnswer }}
    </text>    
  </g>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "BallComponent",
  data: () => ({
    pos: {
      x: 70,
      y: 100,
    },
    centerOffset: {
      x: 0,
      y: 0,
    },
    ballIntervalId: 0
  }),
  computed: {
    ...mapGetters(["getPlayerAnswer", "isInitBall", "isMoveBall"])
  },
  mounted() {
    const path = document.querySelector('#ball');
    if (!path) return;
    const bbox = path.getBBox();
    const centerOffset = this.centerOffset
    centerOffset.x = bbox.x / 2;
    centerOffset.y = bbox.y / 2;
  },
  watch: {
    isInitBall(newVal) {
      if (newVal) {
        this.init()
        this.clearInitBallFlag();
      }
    },
    isMoveBall(newVal) {
      if (newVal) {
        this.moveBallTowardsEnemy();
        this.clearMoveBallFlag();
      } 
    },
  },
  methods: {
    ...mapActions(["clearInitBallFlag", "updateBall", "clearMoveBallFlag"]),
    moveBallTowardsEnemy() {
      const pos = this.pos;
      this.ballIntervalId = setInterval(() => {
        pos.x += 3; 
        pos.y -= 1.5;
        this.updateBall({ pos: this.pos, centerOffset: this.centerOffset });
      }, 50);
    },
    stopBallTowardsEnemy() {
      clearInterval(this.ballIntervalId);
    },
    initPos() {
      const pos = this.pos;
      pos.x = 70;
      pos.y = 100;
    },
    init() {
      this.stopBallTowardsEnemy();
      this.initPos()
    }
  },
}
</script>