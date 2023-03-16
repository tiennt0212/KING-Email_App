import React from "react";
import styled from "styled-components";
import { EmailPreview } from "components";
const EmailPreviewPanelStyled = styled.div`
  /* max-width: 57rem; */
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
