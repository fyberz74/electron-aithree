import { initializeApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate } from "firebase/remote-config";


const firebaseConfig = {
  apiKey: "AIzaSyBfCqyGDy5aaM7OvxK0TD3NK_mNvEr_fak",
  authDomain: "kiosk-ai-892b1.firebaseapp.com",
  projectId: "kiosk-ai-892b1",
  storageBucket: "kiosk-ai-892b1.firebasestorage.app",
  messagingSenderId: "972688921439",
  appId: "1:972688921439:web:44eb913d555deaa1e95cea",
  measurementId: "G-5358FSZ21B"
};

const firebaseApp = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(firebaseApp);
remoteConfig.settings.minimumFetchIntervalMillis = 60000;

fetchAndActivate(remoteConfig).then(() => {
  const baseUrl = remoteConfig.getValue("base_url").asString();
  console.log("👉 Got base_url from Firebase:", baseUrl);

  // send URL to main process
  window.electronAPI.setBaseUrl(baseUrl || "https://avasphere-ai.kejaksaanri.id/");
}).catch(err => {
  console.error("Remote Config error:", err);
});
