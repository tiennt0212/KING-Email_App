const initialState = {
  modal: {
    visible: false,
    title: null,
    message: null,
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
    closeModal() {
      this.setModal(initialState.modal);
    },
    pushNotification({ message }) {
      this.setNotification({ visible: true, message });
    },
  }),
};

export default AppStore;
