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
      console.log("Dispatch event REQUEST_ADDRESS");
      dispatchEvent("REQUEST_ADDRESS");
      window.addEventListener(
        "ICONEX_RELAY_RESPONSE",
        ({ detail: { type, payload } }) => {
          if ((type = "RESPONSE_ADDRESS")) {
            console.log(`Get ${payload}`);
            this.setWallet({ address: payload });
            localStorage.setItem("address", payload);
          }
        }
      );
      window.removeEventListener("ICONEX_RELAY_RESPONSE", () =>
        console.log("Get Wallet successfully")
      );
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
