import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store";
import { Bemails, WorldOfStamps, StampCompose } from "containers";
import { InkBallLoading, DiscoverLoading } from "components";
import { ROUTES } from "utils/constants";
import { PrimaryLayout } from "layouts";
import "./styles/resetCSS.css";
import "./styles/global.css";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Suspense fallback={<></>}>
          <BrowserRouter>
            <PrimaryLayout>
              <Routes>
                <Route path={ROUTES.HOME} element={<WorldOfStamps />} />
                <Route
                  path={ROUTES.WORLD_OF_STAMPS}
                  element={<WorldOfStamps />}
                />
                <Route
                  path={ROUTES.WORLD_OF_STAMPS_DISCOVER}
                  element={<WorldOfStamps />}
                />
                <Route
                  path={ROUTES.WORLD_OF_STAMPS_ME}
                  element={<WorldOfStamps />}
                />
                <Route path={ROUTES.MAILS} element={<Bemails />} />
                <Route path={ROUTES.SENT_MAILS} element={<Bemails />} />
                <Route path={ROUTES.EMAIL_COMPOSE} element={<StampCompose />} />
                <Route path={ROUTES.BOOKMARKS} element={<Bemails />} />
                <Route path={ROUTES.SETTINGS} element={<Bemails />} />
              </Routes>
            </PrimaryLayout>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </React.Fragment>
  );
}

export default App;
