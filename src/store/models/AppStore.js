const initialState = {
  modal: {
    visible: false,
    title: "Hello World!",
    message: "I'm Modal",
    type: null,
  },
  notification: { visible: false, message: "I'm notification" },
};

const AppStore = {
  state: initialState,
  reducers: {
    setModal(state, payload) {
      return {
        ...state,
        modal: payload,
      };
    },
    setNotification(state, payload) {
      return {
        ...state,
        notification: payload,
      };
    },
  },
  effects: (dispatch) => ({
    openModal({ title, message, type }) {
      this.setModal({
        visible: true,
        title,
        message,
        type,
      });
    },
    pushNotification({ message }) {
      this.setNotification({ visible: true, message });
    },
  }),
};

export default AppStore;
