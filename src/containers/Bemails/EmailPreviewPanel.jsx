import React, { Suspense } from "react";
import styled from "styled-components";
import { EmailPreview } from "components";
import { InkBallLoading } from "components";
const EmailPreviewPanelStyled = styled.div`
  min-width: 40rem;
  max-width: 57rem;
  overflow-y: auto;
`;

const EmailPreviewPanel = ({ emailList, onSelectEmail, ...props }) => {
  return (
    <EmailPreviewPanelStyled>
      {emailList.map(
        ({ senderAvt, senderName, cardTitle, time, cardContent }) => (
          <EmailPreview
            key={`${senderName}-${time}`}
            senderAvt={senderAvt}
            senderName={senderName}
            cardTitle={cardTitle}
            time={time}
            cardContent={cardContent}
          />
        )
      )}
    </EmailPreviewPanelStyled>
  );
};

export default EmailPreviewPanel;
