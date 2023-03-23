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
import icMailbox from "assets/images/ic-mailbox.png";
import icPersonal from "assets/images/ic-personal.png";
import gifGlobal from "assets/images/gif-global.gif";

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
    background-color: rgba(0, 0, 0, 0.4); // Fixed overlay color for video
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
  const isStampPage = [
    ROUTES.WORLD_OF_STAMPS,
    ROUTES.WORLD_OF_STAMPS_DISCOVER,
    ROUTES.WORLD_OF_STAMPS_ME,
    ROUTES.HOME,
  ].includes(location.pathname);
  const theme = isStampPage ? WATER_THEME : PAPER_THEME;

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
      authenticate();
    }
  }, [isLoggedIn, wallet.address, authenticate]);

  //
  // Sidebar items
  //

  const manageEmailItems = [
    { icon: icMailbox, route: ROUTES.MAILS, name: "Received Mails" },
    { icon: icPlane, route: ROUTES.SENT_MAILS, name: "Sent Mails" },
    { icon: icPaper, route: ROUTES.EMAIL_COMPOSE, name: "New Compose" },
    { icon: icPersonal, route: ROUTES.WORLD_OF_STAMPS_ME, name: "My Stamps" },
  ];

  const manageStampItems = [
    {
      icon: gifGlobal,
      route: ROUTES.WORLD_OF_STAMPS_DISCOVER,
      name: "Discover",
    },
    { icon: icPersonal, route: ROUTES.WORLD_OF_STAMPS_ME, name: "My Stamps" },
  ];

  const personalizeItems = [
    { icon: icGear, route: ROUTES.SETTINGS, name: "Settings" },
  ];

  return (
    <ThemeProvider theme={theme}>
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
            topUtilities={isStampPage ? manageStampItems : manageEmailItems}
            botUtilities={personalizeItems}
          />
          {children}
        </ContentStyled>
        <Modal {...modal} onCloseModal={closeModal} />
      </PrimaryLayoutStyled>
    </ThemeProvider>
  );
};

export default PrimaryLayout;
