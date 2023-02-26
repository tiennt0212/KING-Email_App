import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store";
import { Bemails, Bookmarks } from "containers";
import { ROUTES } from "utils/constants";
import "./styles/resetCSS.css";
import "./styles/global.css";
import { PrimaryLayout } from "layouts";
import icPlane from "assets/images/ic-plane.png";
import icPaper from "assets/images/ic-paper.png";
function App() {
  const bemailSidebarItems = [
    { icon: icPlane, route: ROUTES.B_EMAILS, name: "All Postcard" },
    { icon: icPaper, route: ROUTES.B_EMAIL_COMPOSE, name: "New Compose" },
  ];
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <PrimaryLayout sidebarItems={bemailSidebarItems}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Bemails />} />
              <Route path={ROUTES.B_EMAILS} element={<Bemails />} />
              <Route path={ROUTES.B_EMAIL_COMPOSE} element={<Bemails />} />
              <Route path={ROUTES.BOOKMARKS} element={<Bemails />} />
              <Route path={ROUTES.WORLD_OF_STAMPS} element={<Bemails />} />
            </Routes>
          </PrimaryLayout>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
