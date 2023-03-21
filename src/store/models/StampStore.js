import {
  dispatchEvent,
  read,
  getTxResult,
  waitTransactionResult,
} from "services/IconService";
import { SCORE } from "utils/constants";
import SbtUserService from "services/SbtUserService";
import StampService from "services/StampService";
import { RegisterSBT } from "components";
import { delay } from "utils/functions";

const initialState = {
  worldWide: [], // all of unminted stamps
  personal: {
    collected: [], // stamps were bought recently
    received: [], // stamps were received along to email
  },
  sent: [], // stamps were used to send email
};

const StampStore = {
  name: "StampStore",
  state: initialState,
  reducers: {
    setWorldWide(state, payload) {
      return { ...state, worldWide: payload };
    },
    setPersonal(state, payload) {
      return { ...state, personal: payload };
    },
    setPersonalCollected(state, payload) {
      return {
        ...state,
        personal: {
          ...personal,
          collected: payload,
        },
      };
    },
    setPersonalReceived(state, payload) {
      return {
        ...state,
        personal: {
          ...personal,
          received: payload,
        },
      };
    },
    setSent(state, payload) {
      return {
        ...state,
        sent: payload,
      };
    },
  },
  effects: (dispatch) => ({
    async getWorldOfStamps() {
      try {
        const res = await StampService.getWorldOfStamps();
        console.log(res);
        console.log(JSON.parse(res));
        this.setWorldWide(JSON.parse(res));
      } catch (error) {
        console.log(error);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
          children: <RegisterSBT submitFunc={this.registerNickname} />,
        });
      }
    },
  }),
};

export default StampStore;
