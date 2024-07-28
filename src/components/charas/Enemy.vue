<template>
  <g :transform="`translate(${pos.x},${pos.y})  scale(${scale})`">
    <image :href="require('@assets/enemy.png')" height="50" width="50" id="enemy"/>
    <text x="0" y="35" font-family="Verdana" font-size="10" fill="yellow">
      {{ question }}
    </text>
  </g>
</template>
<script>
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
    answer: 0,
    questionText: "",
    enemyIntervalId: 0,
  }),
  computed: {
    question() {
      return this.questionText;
    }
  },
  mounted() {
    const path = document.querySelector("#enemy");
    if (!path) return;
    const bbox = path.getBBox();
    const centerOffset = this.centerOffset;
    centerOffset.x = 0;
    centerOffset.y = bbox.height;
    this.makeQuestion();
  },
  methods: {
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
        this.$emit("updatePos");
      }, 1000);
    },
    number1to10() {
      return Math.floor( Math.random() * 9) + 1
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
    makeQuestion() {
      const x = this.number1to10();
      const y = this.number1to10();
      this.questionText = `${x} × ${y}`;
      this.answer = x * y;
    }
  },
};
</script>
