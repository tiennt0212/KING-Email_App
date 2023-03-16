const initialState = {
  modal: {
    visible: false,
    title: null,
    message: null,
    type: null,
    closeable: false,
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
    openModal({ title, message, type, children, closeable }) {
      this.setModal({
        visible: true,
        title,
        message,
        type,
        children,
        closeable,
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
