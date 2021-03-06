import * as firebase from "firebase/app";
import "firebase/auth";
import store from "@/store.ts";

var config = {
  apiKey: "AIzaSyD3v8zIgsV-EAYKByB_ty9hfEnHMdVrb4o",
  authDomain: "trpg-charactors.firebaseapp.com",
  databaseURL: "https://trpg-charactors.firebaseio.com",
  projectId: "trpg-charactors",
  storageBucket: "trpg-charactors.appspot.com",
  messagingSenderId: "223406221322"
};

export default {
  init(): void {
    firebase.initializeApp(config);
    firebase
      .auth()
      .setPersistence(
        process.env.NODE_ENV === "test"
          ? firebase.auth.Auth.Persistence.NONE
          : firebase.auth.Auth.Persistence.SESSION
      );
  },
  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },
  logout() {
    firebase.auth().signOut();
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : null;
      store.commit("onAuthStateChanged", user);

      let userStatus = user === null ? false : true;
      store.commit("onUserStatusChanged", userStatus);
    });
  }
};
