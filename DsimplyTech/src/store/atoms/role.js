import {atom} from "recoil";

export const roleState = atom({
  key: 'roleState',
  default: {
    role: null
  },
});
