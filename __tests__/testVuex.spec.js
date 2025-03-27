import store from '@/store/index'

describe('store.js', () => {
  const testStore = store;

  describe('getters', () => {
    test('playerAnswerの値を取得', () => {
      testStore.state.playerAnswer = 3;
      expect(testStore.getters.getPlayerAnswer).toBe(3)
    })
  });

  describe('mutations', () => {
    test('playerAnswerの値を設定', () => {
      testStore.commit("setPlayerAnswer", 5);
      expect(testStore.getters.getPlayerAnswer).toBe(5);
    })
  });

  describe('actions', () => {
    test('playerAnswerの値を設定', () => {
      testStore.dispatch("updatePlayerAnswer", 6);
      expect(testStore.getters.getPlayerAnswer).toBe(6);
    })
  });
  
})

