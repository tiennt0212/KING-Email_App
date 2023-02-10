const initialState = 0;

const count = {
  state: initialState,
  reducers: {
    increment(state, payload) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload, state) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
};

export default count;
