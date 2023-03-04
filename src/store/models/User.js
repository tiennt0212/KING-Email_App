import { dispatchEvent } from "services/IconService";

const initialState = {
  wallet: { address: null },
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
    async getWallet(payload) {
      try {
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
        window.removeEventListener(
          "ICONEX_RELAY_RESPONSE",
          handleResponseAddress
        );
      } catch (error) {
        console.log(error);
      }
    },
    async signTx(transaction) {
      dispatchEvent("REQUEST_JSON-RPC", transaction);
      const handleSignTX = ({ detail: { type, payload } }) => {
        if (type === "RESPONSE_JSON-RPC") {
          resolve(payload);
          console.log("Done");
        }
        if (type === "CANCEL_JSON-RPC") {
          console.log("Cancel");
        }
      }
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
