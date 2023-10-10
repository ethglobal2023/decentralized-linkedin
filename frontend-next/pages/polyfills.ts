import { Buffer } from "buffer";

// TODO Below change might have unintended side effects
declare global {
  interface Window {
    Buffer:any;
  }
}
window.Buffer = window.Buffer ?? Buffer;
window.global = window.global ?? window;
