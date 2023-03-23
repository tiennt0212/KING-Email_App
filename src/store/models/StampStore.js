// import {
//   dispatchEvent,
//   read,
//   getTxResult,
//   waitTransactionResult,
// } from "services/IconService";
// import { SCORE } from "utils/constants";
// import SbtUserService from "services/SbtUserService";
import StampService from "services/StampService";
// import { RegisterSBT } from "components";
// import { delay } from "utils/functions";
import { IconConverter } from "services/IconService";
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
          ...state.personal,
          collected: payload,
        },
      };
    },
    setPersonalReceived(state, payload) {
      return {
        ...state,
        personal: {
          ...state.personal,
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
        const handleStampData = async (stamps) => {
          // Parse from String to Array of Objects
          const parsed = JSON.parse(stamps);

          // Convert null, boolean values
          const converted = parsed.map((stamp) => {
            for (const key in stamp) {
              if (stamp[key] === "null") stamp[key] = null;
              if (stamp[key] === "false") stamp[key] = false;
              if (stamp[key] === "true") stamp[key] = true;
            }
            return stamp;
          });

          // Get Creator data
          const setOfCreator = new Set(converted.map((stamp) => stamp.creator));
          for (const creatorAddress of setOfCreator.values()) {
            console.log(creatorAddress);
            const creatorInfo = await dispatch.UserStore.getUser(
              creatorAddress
            );
            converted.forEach((element) => {
              if ((element.creator = creatorAddress))
                element.creatorInfo = creatorInfo;
            });
          }
          return converted;
        };
        const handledData = await handleStampData(res);
        this.setWorldWide(handledData);
      } catch (error) {
        console.log(error);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
          closeable: true,
        });
      }
    },
    async getReceivedEmail() {
      try {
        const res = await StampService.getUserStamp({
          expired: IconConverter.toHex(1),
          address: localStorage.getItem("address"),
        });
        console.log(res);
        console.log(JSON.parse(res));
        this.setPersonalReceived(JSON.parse(res));
      } catch (error) {
        console.log(error);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
          closeable: true,
        });
      }
    },
    async buyStamp({ stampId }, rootState) {
      try {
        const resBuy = await StampService.buyStamp({
          stampId: stampId,
        });
        // console.log(resBuy);
        // console.log(JSON.parse(resBuy));
        const txURL = `https://lisbon.tracker.solidwallet.io/transaction/${resBuy?.result}`;
        console.log("txURL", txURL);
        this.setWorldWide(
          rootState.StampStore.worldWide.filter(
            (stamp) => stamp?.id !== stampId
          )
        );
        dispatch.AppStore.openModal({
          title: "Buy Stamp successfully!",
          message: `A new stamp has ID ${stampId} was added to your collection!`,
          children: (
            <a href={txURL} target="_blank" style={{ fontSize: "1.6rem" }}>
              Transaction
            </a>
          ),
          closeable: true,
        });
      } catch (error) {
        console.log(error);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
          closeable: true,
        });
      }
    },
    async getMyStamp() {
      try {
        const res = await StampService.getUserStamp({
          address: localStorage.getItem("address"),
          expired: IconConverter.toHex(0),
        });
        const handleStampData = async (stamps) => {
          let a;
          if (stamps[stamps.length - 2] === ",") {
            console.log("RIGHT");
            a = stamps.replace(/},]/i, "}]");
          }

          // Parse from String to Array of Objects
          const parsed = JSON.parse(a);

          // Convert null, boolean values
          const converted = parsed.map((stamp) => {
            for (const key in stamp) {
              if (stamp[key] === "null") stamp[key] = null;
              if (stamp[key] === "false") stamp[key] = false;
              if (stamp[key] === "true") stamp[key] = true;
            }
            return stamp;
          });

          // Get Creator data
          const setOfCreator = new Set(converted.map((stamp) => stamp.creator));
          for (const creatorAddress of setOfCreator.values()) {
            console.log(creatorAddress);
            const creatorInfo = await dispatch.UserStore.getUser(
              creatorAddress
            );
            converted.forEach((element) => {
              if ((element.creator = creatorAddress))
                element.creatorInfo = creatorInfo;
            });
          }
          return converted;
        };
        const handledData = await handleStampData(res);
        this.setPersonalCollected(handledData);
      } catch (error) {
        console.log(error);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
          closeable: true,
        });
      }
    },
    // Debug
    // async getStamp() {
    //   try {
    //     const res = await StampService.getStamp({
    //       stampId: IconConverter.toBigNumber(1),
    //     });
    //     console.log(res);
    //     console.log(JSON.parse(res));
    //     // this.setPersonalReceived(JSON.parse(res));
    //   } catch (error) {
    //     console.log(error);
    //     dispatch.AppStore.openModal({
    //       title: "Something went wrong~~",
    //       message: error.message,
    //       closeable: true,
    //     });
    //   }
    // },
  }),
};

export default StampStore;
