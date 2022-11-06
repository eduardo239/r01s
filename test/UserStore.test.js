import { render } from '@testing-library/vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { useUserStore } from '../src/stores/user';
import { createPinia, setActivePinia } from 'pinia';

describe('UserStore.vue', () => {
  it('Store', () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });
  });

  it('check if user is logged in', () => {
    const user = useUserStore();
    expect(user.isLoggedIn).toBe(false);
  });

  it('check if user is null', () => {
    const user = useUserStore();
    expect(user.user).toBe(null);
  });

  it('check if user local storage is null', () => {
    const user = useUserStore();
    expect(user.userLocalStorage).toBe(null);
  });

  it('check loading is false', () => {
    const user = useUserStore();
    expect(user.loading).toBe(false);
  });
});
