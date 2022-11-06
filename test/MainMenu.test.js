import { render } from '@testing-library/vue';
import { beforeEach, describe, expect, it } from 'vitest';
import MainMenu from '../src/components/ui/MainMenu.vue';
import { mount } from '@vue/test-utils';
import { useUserStore } from '../src/stores/user';
import { createPinia, setActivePinia } from 'pinia';

describe('MainMenu.vue', () => {
  it('initiate store', () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });
  });

  it('must contain class .menu', () => {
    const wrapper = mount(MainMenu);
    expect(wrapper.classes('menu')).toBe(true);
  });
});
