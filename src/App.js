import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "utils/constants";
import "./styles/resetCSS.css";
import { Bemails, Bookmarks } from "containers";
import "./styles/global.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.B_EMAILS} element={<Bemails />} />
          <Route path={ROUTES.BOOKMARKS} element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
