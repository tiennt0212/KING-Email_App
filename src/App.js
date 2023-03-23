import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store";
import { Bemails, WorldOfStamps } from "containers";
import { ROUTES } from "utils/constants";
import "./styles/resetCSS.css";
import "./styles/global.css";
import { PrimaryLayout } from "layouts";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <PrimaryLayout>
            <Routes>
              <Route path={ROUTES.HOME} element={<WorldOfStamps />} />
              <Route path={ROUTES.B_EMAILS} element={<Bemails />} />
              <Route path={ROUTES.B_EMAIL_COMPOSE} element={<Bemails />} />
              <Route path={ROUTES.BOOKMARKS} element={<Bemails />} />
              <Route
                path={ROUTES.WORLD_OF_STAMPS}
                element={<WorldOfStamps />}
              />
              <Route path={ROUTES.SETTINGS} element={<Bemails />} />
            </Routes>
          </PrimaryLayout>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
