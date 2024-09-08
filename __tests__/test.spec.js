import { shallowMount } from '@vue/test-utils'
import InfoDisplay from '../src/components/InfoDisplay.vue'


describe('Counter', () => {

    it('renders the correct markup', () => {
    const wrapper = shallowMount(InfoDisplay,{
      props:{
        infoDisplayStatus: "GAME_OVER"
      }
    });
    expect(wrapper.vm.titleText).toBe("ゲームオーバー")
  })
})