<template>
    <!-- <rect width="500" height="500"/> -->
  <v-container >
    <v-dialog
      v-model="dialog"
      activator="parent"
    >
      <v-sheet>
        <v-sheet class="my-2 mx-5">
          <h2>
            {{ titleText }}
          </h2>

          <p class="my-4">
            {{ infoText }}
          </p>

          <v-btn color="primary" block @click="buttonClick()">{{ buttonText }}</v-btn>
        </v-sheet>
      </v-sheet>
    </v-dialog>
  </v-container>
  <!-- <v-dialog v-if="status!=''">
    <template v-if="status=='GAME_OVER'">
      <text id="text" class="text" x="100" y="30" fill="#6db9fc" stroke="#000" stroke-width="2">
        ゲームオーバー
      </text>
      <text id="text" class="text" x="100" y="50" fill="#6db9fc" stroke="#000" stroke-width="2">
        ゲーム時間１０分減らす
      </text>
    </template>
    <template v-if="status=='GAME_CLEAR'">
      <text id="text" class="text" x="100" y="30" fill="#6db9fc" stroke="#000" stroke-width="2">
        ゲームクリア
      </text>
      <text id="text" class="text" x="100" y="50" fill="#6db9fc" stroke="#000" stroke-width="2">
        ゲーム時間１時間追加
      </text>
    </template>
    <template v-if="status=='GAME_START'">
      <button
        @click="moveEnemyTowardsPlayer"
      >
        ゲーム開始
      </button>
    </template>
  </v-dialog> -->
</template>
<script>
export default {
  name: "InfoDisplay",
  props: {
    infoDisplayStatus: { type: String, default: "" },
  },
  data: () => ({
    infoTexts: {
      GAME_START: {
        titleText: "ゲーム開始",
        infoText: "ゲーム開始します",
        buttonText: "ゲーム開始"
      },
      GAME_CLEAR: {
        titleText: "ゲームクリア",
        infoText: "ゲーム時間１時間追加",
        buttonText: "閉じる"
      },
      GAME_OVER: {
        titleText: "ゲームオーバー",
        infoText: "ゲーム時間１０分減らす",
        buttonText: "閉じる"
      },
    },
  }),
  computed: {
    dialog: {
      get() {
        return this.infoDisplayStatus != "";
      },
      set() {
        this.$emit("updateStatus", "");
      }
    },
    titleText(){
      if (!this.infoDisplayStatus) return "";
      return this.infoTexts[this.infoDisplayStatus].titleText;
    },
    infoText() {
      if (!this.infoDisplayStatus) return "";
      return this.infoTexts[this.infoDisplayStatus].infoText;
    },
    buttonText() {
      if (!this.infoDisplayStatus) return "";
      return this.infoTexts[this.infoDisplayStatus].buttonText;
    },
  },
  mounted() {
    console.log("InfoDisplay", this.infoDisplayStatus)
  },
  methods: {
    buttonClick() {
      this.dialog = false;
      if(this.infoDisplayStatus == "GAME_START") this.$emit("gameStart");
    }
  }
};
</script>
