// import {
//   dispatchEvent,
//   read,
//   getTxResult,
//   waitTransactionResult,
// } from "services/IconService";
import { ROUTES } from "utils/constants";
// import SbtUserService from "services/SbtUserService";
import StampService from "services/StampService";
// import { RegisterSBT } from "components";
// import { delay } from "utils/functions";
import { IconConverter, IconValidator } from "services/IconService";
import { delay } from "utils/functions";
import { Button } from "components";
const initialState = {
  worldWide: [], // all of unminted stamps
  personal: {
    collected: [], // stamps were bought recently
    received: [], // stamps were received along to email
    selected: {}, // selected stamp
    sent: [], // stamps were used to send email
  },
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
    setSelectedStamp(state, payload) {
      return {
        ...state,
        personal: {
          ...state.personal,
          selected: payload,
        },
      };
    },
    setSentMail(state, payload) {
      return {
        ...state,

        personal: {
          ...state.personal,
          sent: payload,
        },
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
              if ((element.creator === creatorAddress))
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
        console.log("res", res);
        const handleStampData = async (stamps) => {
          let a = stamps;
          // Remove the last comma
          if (stamps[stamps.length - 2] === ",") {
            console.log("RIGHT");
            a = stamps.replace(/},]/i, "}]");
          }
          console.log("removed comma", a);

          // Replace new lines by \\n
          a = a.replace(/\\n/g, "\\n");
          a = a.replace(/""/g, '"');
          console.log("replace new line", a);

          // Parse from String to Array of Objects
          const parsed = JSON.parse(a);
          console.log("parsed", parsed);

          // Convert null, boolean values
          const converted = parsed.map((stamp) => {
            for (const key in stamp) {
              if (stamp[key] === "null") stamp[key] = null;
              if (stamp[key] === "false") stamp[key] = false;
              if (stamp[key] === "true") stamp[key] = true;
            }
            return stamp;
          });
          const setOfSender = new Set(converted.map((stamp) => stamp?.sender));
          for (const senderAddress of setOfSender.values()) {
            console.log(senderAddress);
            const senderInfo = await dispatch.UserStore.getUser(senderAddress);
            converted.forEach((element) => {
              if ((element.sender === senderAddress)) {
                element.senderInfo = senderInfo;
                console.log("Updated element: ", element);
              }
            });
          }
          return converted;
        };
        const handledData = await handleStampData(res);
        this.setPersonalReceived(handledData);
      } catch (error) {
        console.log(error);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
          closeable: true,
        });
      }
    },
    async getSentEmail() {
      try {
        const res = await StampService.getUserSentEmail({
          address: localStorage.getItem("address"),
          // expired: IconConverter.toHex(1),
        });
        console.log("res", res);
        const handleStampData = async (stamps) => {
          let a = stamps;
          // Remove the last comma
          if (stamps[stamps.length - 2] === ",") {
            console.log("RIGHT");
            a = stamps.replace(/},]/i, "}]");
          }
          console.log("removed comma", a);

          // Replace new lines by \\n
          a = a.replace(/\n/g, "\\n");
          a = a.replace(/""/g, '"');
          console.log("replace new line", a);

          // Parse from String to Array of Objects
          const parsed = JSON.parse(a);
          console.log("parsed", parsed);

          // Convert null, boolean values
          const converted = parsed.map((stamp) => {
            for (const key in stamp) {
              if (stamp[key] === "null") stamp[key] = null;
              if (stamp[key] === "false") stamp[key] = false;
              if (stamp[key] === "true") stamp[key] = true;
            }
            return stamp;
          });
          const setOfReceiver = new Set(
            converted.map((stamp) => stamp?.receiver)
          );
          for (const receiverAddress of setOfReceiver.values()) {
            const receiverInfo = await dispatch.UserStore.getUser(
              receiverAddress
            );
            converted.forEach((element) => {
              if ((element.receiver === receiverAddress)) {
                element.receiverInfo = receiverInfo;
                console.log("Updated element: ", element);
              }
            });
          }
          return converted;
        };
        const handledData = await handleStampData(res);
        this.setSentMail(handledData);
      } catch (error) {
        console.log(error);
        // dispatch.AppStore.openModal({
        //   title: "Something went wrong~~",
        //   message: error.message,
        //   closeable: true,
        // });
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
        const address = localStorage.getItem("address");
        if (!address) throw Error("You have to connect wallet first");
        const res = await StampService.getUserStamp({
          address: localStorage.getItem("address"),
          expired: IconConverter.toHex(0),
        });
        console.log(res);
        const handleStampData = async (stamps) => {
          // Remove the last comma
          let a = stamps;
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
        if (handledData.length === 0) {
          dispatch.AppStore.openModal({
            title: "Oooopppppppppsssss!",
            message: "No stamp here! Let's buy from Discover Stamps",
            children: (
              <Button
                text="Go to Discover Page"
                type="transparent"
                onClick={() =>
                  window.location.assign(ROUTES.WORLD_OF_STAMPS_DISCOVER)
                }
              />
            ),
          });
        }
      } catch (error) {
        console.log(error);
        dispatch.AppStore.openModal({
          title: "Something went wrong~~",
          message: error.message,
          closeable: true,
        });
      }
    },
    async getStampById({ stampId }) {
      try {
        const res = await StampService.getStamp({ stampId: stampId });
        this.setSelectedStamp(JSON.parse(res));
      } catch (error) {
        console.log(error);
      }
    },
    async sendMail({ stampId, receiver, title, content }) {
      try {
        if (!IconValidator.isAddress(receiver))
          throw Error("Receiver input is not valid");
        const resSend = await StampService.sendMail({
          stampId,
          receiver,
          title,
          content: JSON.stringify(content),
        });
        // this.setSelectedStamp(JSON.parse(res));
        // console.log(resSend);
        // console.log(JSON.parse(resSend));
        const txURL = `https://lisbon.tracker.solidwallet.io/transaction/${resSend?.result}`;
        dispatch.AppStore.openModal({
          title: "Successfully!",
          message: `You have sent a letter successfully to \n ${receiver}`,
          closeable: true,
          children: (
            <a href={txURL} target="_blank" style={{ fontSize: "1.6rem" }}>
              Transaction
            </a>
          ),
        });
        localStorage.removeItem("selected");
        this.setSelectedStamp({});
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
