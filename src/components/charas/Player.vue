<template>
  <g :transform="`translate(${pos.x},${pos.y})`">
    <image :href="require('@assets/player.png')" height="100" width="100" id="player"/>
  </g>
</template>
<script>
import { mapActions } from "vuex"
export default {
  name: "PlayerComponent",
  data: () => ({
    pos: {
      x: 5,
      y: 80,
    },
    centerOffset: {
      x: 0,
      y: 0,
    },
  }),
  mounted() {
    const path = document.querySelector('#player');
    if (!path) return;
    const bbox = path.getBBox();
    const centerOffset = this.centerOffset
    centerOffset.x = bbox.x / 2;
    centerOffset.y = bbox.y / 2;
    this.updatePlayer({ pos: this.pos, centerOffset });
  },
  methods: {
    ...mapActions(["updatePlayer"]),
  },
}
</script>