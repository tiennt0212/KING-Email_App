import { dispatchEvent, read } from "services/IconService";
import { SCORE } from "utils/constants";
import SbtUserService from "services/SbtUserService";

const initialState = {
  wallet: { address: localStorage.getItem("address") },
  info: null,
};

const UserModel = {
  name: "User",
  state: initialState,
  reducers: {
    setWallet(state, payload) {
      return { ...state, wallet: payload };
    },
    setInfo(state, payload) {
      return { ...state, info: payload };
    },
  },
  effects: (dispatch) => ({
    getWallet(payload) {
      console.log("Dispatch event REQUEST_ADDRESS");
      dispatchEvent("REQUEST_ADDRESS");
      const handleResponseAddress = ({ detail: { type, payload } }) => {
        if ((type = "RESPONSE_ADDRESS")) {
          console.log(`Get ${payload}`);
          this.setWallet({ address: payload });
          localStorage.setItem("address", payload);
        }
      };
      window.addEventListener("ICONEX_RELAY_RESPONSE", handleResponseAddress);
    },
    async authenticate(payload) {
      const { address } = payload;
      try {
        const res = await SbtUserService.getUser({ address: address });
        // if (res?.error) {
        //   const error = new Error(res?.error?.message);
        //   error.code = res?.error?.code;
        //   throw error;
        // }
        console.log(res);
      } catch (error) {
        if (error.includes("E0032:Reverted(0)")) {
          console.log("open Modal form");
        }
        // console.log("alo error", error);
        // console.log("alo error code", error.code);
        // console.log("alo error message", error.message);
      }
    },
    async signTx(transaction) {
      dispatchEvent("REQUEST_JSON-RPC", transaction);
      const handleSignTX = ({ detail: { type, payload } }) => {
        if (type === "RESPONSE_JSON-RPC") {
          console.log("Done");
        }
        if (type === "CANCEL_JSON-RPC") {
          console.log("Cancel");
        }
      };
      window.addEventListener("ICONEX_RELAY_RESPONSE", handleSignTX);
      window.removeEventListener("ICONEX_RELAY_RESPONSE", handleSignTX);
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    isLoggedIn() {
      return createSelector(this.selectUser, (User) => !!User?.wallet?.address);
    },
    selectUser() {
      return slice((state) => state);
    },
    getAddress() {
      return createSelector(this.selectUser, (User) => User.address);
    },
  }),
};

export default UserModel;
