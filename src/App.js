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
import icGear from "assets/images/ic-gear.png";
import icQuestion from "assets/images/ic-question.png";

function App() {
  const manageEmailItems = [
    { icon: icPlane, route: ROUTES.B_EMAILS, name: "All Postcard" },
    { icon: icPaper, route: ROUTES.B_EMAIL_COMPOSE, name: "New Compose" },
  ];

  const personalizeItems = [
    // {
    //   icon: icWallet,
    //   action: () => alert("Click on Wallet button"),
    //   name: "Your Wallet",
    //   htmlClass: "user-wallet",
    // },
    { icon: icGear, route: ROUTES.SETTINGS, name: "Settings" },
    {
      icon: icQuestion,
      action: () => alert("Click on Question button"),
      name: "Supports",
      htmlClass: "need-support",
    },
  ];
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <PrimaryLayout
            sidebar={{
              topUtilities: manageEmailItems,
              botUtilities: personalizeItems,
            }}
          >
            <Routes>
              <Route path={ROUTES.HOME} element={<Bemails />} />
              <Route path={ROUTES.B_EMAILS} element={<Bemails />} />
              <Route path={ROUTES.B_EMAIL_COMPOSE} element={<Bemails />} />
              <Route path={ROUTES.BOOKMARKS} element={<Bemails />} />
              <Route path={ROUTES.WORLD_OF_STAMPS} element={<Bemails />} />
              <Route path={ROUTES.SETTINGS} element={<Bemails />} />
            </Routes>
          </PrimaryLayout>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
