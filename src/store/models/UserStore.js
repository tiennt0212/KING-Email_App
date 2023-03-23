import { useMemo } from "react";
import {
  dispatchEvent,
  read,
  getTxResult,
  waitTransactionResult,
} from "services/IconService";
import { SCORE } from "utils/constants";
import SbtUserService from "services/SbtUserService";
import { RegisterSBT } from "components";
import { delay } from "utils/functions";

const initialState = {
  wallet: { address: localStorage.getItem("address") },
  info: null,
  memoUserInfo: {},
};

const UserStore = {
  name: "UserStore",
  state: initialState,
  reducers: {
    setWallet(state, payload) {
      return { ...state, wallet: payload };
    },
    setInfo(state, payload) {
      return { ...state, info: payload };
    },
    setUser(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    pushMemoUserInfo(state, payload) {
      const { address } = payload;
      return {
        ...state,
        memoUserInfo: {
          ...state.memoUserInfo,
          [address]: payload,
        },
      };
    },
  },
  effects: (dispatch) => ({
    getWallet() {
      console.log("Dispatch event REQUEST_ADDRESS");
      dispatchEvent("REQUEST_ADDRESS");
      const handleResponseAddress = ({ detail: { type, payload } }) => {
        if ((type = "RESPONSE_ADDRESS")) {
          console.log(`Get ${payload}`);
          this.setWallet({ address: payload });
          localStorage.setItem("address", payload);
        }
      };
      window.addEventListener("ICONEX_RELAY_RESPONSE", handleResponseAddress, {
        once: true,
      });
    },
    async getUser(address, rootState) {
      if (rootState.UserStore.memoUserInfo.hasOwnProperty(address)) {
        console.log("Address ", address, "is exists");
        return rootState.UserStore.memoUserInfo[address];
      } else {
        console.log("Address ", address, "is NON exists");

        const res = await SbtUserService.getUser({ address: address });
        const resJson = JSON.parse(res);
        this.pushMemoUserInfo(resJson);
        return resJson;
      }
    },
    async authenticate() {
      console.log("Call authenticate func");
      const address = localStorage.getItem("address");
      try {
        const res = await this.getUser(address);
        this.setInfo(res);
      } catch (error) {
        if (error.includes("E0032:Reverted(0)")) {
          console.log("open Modal form");
          dispatch.AppStore.openModal({
            title: "Please register your nickname",
            message: `Your address: ${address} doesn't have a nickname in KING`,
            children: <RegisterSBT submitFunc={this.registerNickname} />,
          });
        }
      }
    },
    async registerNickname({ _name }) {
      try {
        const resRegister = await SbtUserService.registerUser({
          from: localStorage.getItem("address"),
          name: _name,
          avatar: "",
        });
        const txURL = `https://lisbon.tracker.solidwallet.io/transaction/${resRegister?.result}`;
        if (resRegister?.error) {
          throw new Error(resRegister?.error?.message);
        }
        this.setInfo({ name: _name });
        dispatch.AppStore.openModal({
          title: "You have registered successfully!",
          message: `Your nickname now is ${_name}`,
          children: (
            <a href={txURL} target="_blank" style={{ fontSize: "1.6rem" }}>
              Transaction
            </a>
          ),
        });
      } catch (error) {
        console.log(error);
        console.log(error.message);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
        });
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
      window.addEventListener("ICONEX_RELAY_RESPONSE", handleSignTX, {
        once: true,
      });
      window.removeEventListener("ICONEX_RELAY_RESPONSE", handleSignTX);
    },
    logout() {
      localStorage.removeItem("address");
      this.setWallet({ address: null });
    },
  }),
  selectors: (slice, createSelector, hasProps) => ({
    isLoggedIn() {
      return createSelector(
        this.selectUser,
        (UserStore) => !!UserStore?.wallet?.address
      );
    },
    selectUser() {
      return slice((state) => state);
    },
    getAddress() {
      return createSelector(this.selectUser, (UserStore) => UserStore.address);
    },
  }),
};

export default UserStore;
