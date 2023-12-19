import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const state = {
    token: ref(localStorage.getItem('token') || null),
    isAdmin: ref(false)
  };

  const updateToken = (token) => {
    state.token.value = token;
    localStorage.setItem('token', token);
  };

  const updateAdmin = (isAdmin) => {
    state.isAdmin.value = isAdmin;
    localStorage.setItem('admin', isAdmin);

  }

  const removeToken = () => {
    state.token.value = null;
    localStorage.removeItem('token');
  }

  return {
    ...state,
    updateToken,
    removeToken,
    updateAdmin
  };
});
