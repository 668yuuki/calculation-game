<template>
  <g :transform="`translate(${pos.x},${pos.y})`">
    <image :href="require('@assets/fireBall.png')" height="20" width="20" id="ball"/>
    <text x="-10" y="-10" font-family="Verdana" font-size="10" fill="red">
      {{ playerAnswer }}
    </text>    
  </g>
</template>
<script>
export default {
  name: "BallComponent",
  props: {
    playerAnswer: { type: String, default: "" }
  },
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
  mounted() {
    const path = document.querySelector('#ball');
    if (!path) return;
    const bbox = path.getBBox();
    const centerOffset = this.centerOffset
    centerOffset.x = bbox.x / 2;
    centerOffset.y = bbox.y / 2;
  },
  methods: {
    moveBallTowardsEnemy() {
      const pos = this.pos;
      this.ballIntervalId = setInterval(() => {
        pos.x += 3; 
        pos.y -= 1.5;
        this.$emit("updatePos");
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