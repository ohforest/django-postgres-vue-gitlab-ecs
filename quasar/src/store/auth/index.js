export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_REFRESH = "AUTH_REFRESH";

// import axios from "axios";
import Vue from "vue";
import { Cookies } from "quasar";
import { USER_REQUEST } from "../user";
import gqljwt from "./gqljwt";

const state = {
  authenticated: localStorage.getItem("authenticated") || "",
  status: "",
  hasLoadedOnce: false,
};

const getters = {
  getAuthenticated: (s) => s.authenticated,
  isAuthenticated: (s) => !!s.authenticated,
  authStatus: (s) => s.status,
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) =>
    new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      Vue.prototype.$axios
        .post("/api/login/", user)
        .then((resp) => {
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          resolve(resp);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("authenticated");
          reject(err);
        });
    }),
  [AUTH_LOGOUT]: ({ commit, dispatch, state }) => {
    Vue.prototype.$axios.post("/api/logout/").then(() => {
      commit(AUTH_LOGOUT);
    });
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, payload) => {
    localStorage.setItem("authenticated", "success");
    state.status = "success";
    state.authenticated = "success";
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: (state) => {
    localStorage.removeItem("authenticated");
    state.authenticated = "";
  },
};

const modules = {
  gqljwt,
};

export default {
  state,
  getters,
  actions,
  mutations,
  modules,
};
