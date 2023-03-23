import React, { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { useDispatch, useSelector, useStore } from "hooks";
import { Sidebar, Modal, InkBallLoading, DiscoverLoading } from "components";
import { Header } from "containers";
import vdTech from "assets/videos/vdTech.mp4";
import { ROUTES } from "utils/constants";
import { PAPER_THEME, WATER_THEME } from "styles/theme";
import icPlane from "assets/images/ic-plane.png";
import icPaper from "assets/images/ic-paper.png";
import icGear from "assets/images/ic-gear.png";
// import icQuestion from "assets/images/ic-question.png";

const PrimaryLayoutStyled = styled.div`
  height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.contrastColor};
`;

const VideoBackgroundStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.6); // Fixed overlay color for video
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ContentStyled = styled.div`
  display: flex;
  height: calc(100% - 9rem);
`;

const PrimaryLayout = ({ children, sidebar, ...rest }) => {
  const location = useLocation();
  const theme =
    location.pathname === ROUTES.WORLD_OF_STAMPS ? WATER_THEME : PAPER_THEME;

  const { wallet, info, modal } = useSelector(({ UserStore, AppStore }) => ({
    wallet: UserStore.wallet,
    info: UserStore.info,
    modal: AppStore.modal,
  }));

  const { getWallet, authenticate, logout, closeModal } = useDispatch(
    ({ UserStore, AppStore }) => ({
      getWallet: UserStore.getWallet,
      authenticate: UserStore.authenticate,
      logout: UserStore.logout,
      closeModal: AppStore.closeModal,
    })
  );

  const { isLoggedIn } = useStore(({ UserStore }) => ({
    isLoggedIn: UserStore.isLoggedIn,
  }));

  useEffect(() => {
    if (isLoggedIn) {
      console.log("logged in");
      authenticate();
    }
  }, [isLoggedIn, wallet.address, authenticate]);

  //
  // Sidebar items
  //

  const manageEmailItems = [
    { icon: icPlane, route: ROUTES.B_EMAILS, name: "All Postcard" },
    { icon: icPaper, route: ROUTES.B_EMAIL_COMPOSE, name: "New Compose" },
  ];

  const personalizeItems = [
    { icon: icGear, route: ROUTES.SETTINGS, name: "Settings" },
  ];

  console.log(info);
  return (
    // <Suspense
    //   fallback={
    //     location.pathname === ROUTES.WORLD_OF_STAMPS ? (
    //       <DiscoverLoading />
    //     ) : (
    //       <InkBallLoading />
    //     )
    //   }
    // >
    <ThemeProvider theme={theme}>
      {/* <InkBallLoading /> */}
      <PrimaryLayoutStyled>
        {theme.name === WATER_THEME.name && (
          <VideoBackgroundStyled>
            <video autoPlay muted loop>
              <source src={vdTech} type="video/mp4" />
            </video>
            <div className="overlay"></div>
          </VideoBackgroundStyled>
        )}
        <Header
          isLoggedIn={isLoggedIn}
          userAvt={info?.avatar}
          userAddr={wallet?.address}
          userNickname={info?.name}
          onConnectWallet={getWallet}
          logoutHandler={logout}
          user={info}
        />
        <ContentStyled>
          <Sidebar
            topUtilities={manageEmailItems}
            botUtilities={personalizeItems}
          />
          {children}
        </ContentStyled>
        <Modal {...modal} onCloseModal={closeModal} />
      </PrimaryLayoutStyled>
    </ThemeProvider>
    // </Suspense>
  );
};

export default PrimaryLayout;
