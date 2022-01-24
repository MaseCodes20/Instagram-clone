import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const inboxModalState = atom({
  key: "inboxModalState",
  default: false,
});
