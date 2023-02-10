import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store";
import { Bemails, Bookmarks } from "containers";
import { ROUTES } from "utils/constants";
import "./styles/resetCSS.css";
import "./styles/global.css";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.B_EMAILS} element={<Bemails />} />
            <Route path={ROUTES.BOOKMARKS} element={<Bookmarks />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
