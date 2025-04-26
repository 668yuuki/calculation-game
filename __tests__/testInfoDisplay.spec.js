import { shallowMount } from '@vue/test-utils'
import InfoDisplay from '../src/components/InfoDisplay.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

describe('Counter', () => {
  it('renders the correct markup', () => {
    const vuetify = createVuetify({ components, directives })
    const wrapper = shallowMount(InfoDisplay, {
      global: {
        plugins: [vuetify],
      },
      props: {
        infoDisplayStatus: 'GAME_OVER',
      },
    })
    expect(wrapper.vm.titleText).toBe('ゲームオーバー')
  })
})