import { createStore } from 'vuex'

const store = createStore({
  state: {
    playerAnswer: "",
    enemyAnswer: 0,
    questionText: "",
    player: null,
    enemy: null,
    ball: null,
    controlFlag: {
      enemy: {
        init: false,
        move: false,  
      },
      ball: {
        init: false,
        move: false,  
      },
    },
  },
  mutations: {
    setPlayerAnswer(state, answer) {
      state.playerAnswer = answer
    },
    setEnemyAnswer(state, answer) {
      state.enemyAnswer = answer
    },
    setQuestionText(state, question) {
      state.questionText = question
    },
    setPlayer(state, player) {
      state.player = player;
    },
    setEnemy(state, enemy) {
      state.enemy = enemy;
    },
    setBall(state, ball) {
      state.ball = ball;
    },
    setControlFlag(state, { component, type, flag }) {
      state.controlFlag[component][type] = flag;
    },
  },
  actions: {
    updatePlayerAnswer({ commit }, playerAnswer) {
      commit('setPlayerAnswer', playerAnswer)
    },
    makeQuestion({ commit }) {
      const x = number1to10();
      const y = number1to10();
      commit("setQuestionText", `${x} × ${y}`);
      commit("setEnemyAnswer", x * y);
    },
    updatePlayer({ commit }, player) {
      commit("setPlayer", player);
    },
    updateEnemy({ commit }, enemy) {
      commit("setEnemy", enemy);
    },
    updateBall({ commit }, ball) {
      commit("setBall", ball);
    },
    initEnemy({ commit }) {
      commit("setControlFlag", { component: "enemy", type: "init", flag: true });
    },
    clearInitEnemyFlag({ commit}) {
      commit("setControlFlag", { component: "enemy", type: "init", flag: false });
    },
    moveEnemy({ commit }) {
      commit("setControlFlag", { component: "enemy", type: "move", flag: true });
    },
    clearMoveEnemyFlag({ commit }) {
      commit("setControlFlag",  { component: "enemy", type: "move", flag: false });
    },
    initBall({ commit }) {
      commit("setControlFlag", { component: "ball", type: "init", flag: true });
    },
    clearInitBallFlag({ commit}) {
      commit("setControlFlag", { component: "ball", type: "init", flag: false });
    },
    throwBall({ commit }) {
      commit("setControlFlag", { component: "ball", type: "move", flag: true });
    },
    clearMoveBallFlag({ commit }) {
      commit("setControlFlag",  { component: "ball", type: "move", flag: false });
    },
  },
  getters: {
    getPlayerAnswer(state) {
      return state.playerAnswer
    },
    getEnemyAnswer(state) {
      return state.enemyAnswer
    },
    getQuestionText(state) {
      return state.questionText
    },
    isPlayerAndEnemyCollisionDetection(state) {
      const enemy =state.enemy
      const player = state.player;
      if (!enemy?.pos) return false;
      if (!player?.pos) return false;

      const enemyCenterPos = getCenterPos(enemy);      
      const playerCenter = getCenterPos(player);
      if ((playerCenter.x > enemyCenterPos.x) && (playerCenter.y > enemyCenterPos.y)) {
          return true;
      }
      return false;
    },
    isBallAndEnemyCollisionDetection(state) {
      const enemy =state.enemy
      if (!enemy) return false;
      const enemyCenterPos = getCenterPos(enemy);
      const ball = state.ball;
      if (!ball) return false;
      const ballCenter = getCenterPos(ball);
      if (ballCenter.y < enemyCenterPos.y) {
        return true;
      }
      return false;
    },
    isInitEnemy(state) {
      return state.controlFlag.enemy.init;
    },
    isMoveEnemy(state) {
      return state.controlFlag.enemy.move;
    },
    isInitBall(state) {
      return state.controlFlag.ball.init;
    },
    isMoveBall(state) {
      return state.controlFlag.ball.move;
    },
  }
})

const number1to10 = () => {
  return Math.floor( Math.random() * 9) + 1
};

const getCenterPos = (target) => {
  const pos = target.pos;
  const centerOffset = target.centerOffset;
  return { x: pos.x + centerOffset.x, y: pos.y + centerOffset.y }
};

export default store
