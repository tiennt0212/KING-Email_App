import React, { Suspense } from "react";
import styled from "styled-components";
import { EmailPreview } from "components";
import { InkBallLoading } from "components";
const EmailPreviewPanelStyled = styled.div`
  min-width: 40rem;
  max-width: 57rem;
  overflow-y: auto;
`;
const EmailPreviewPanel = ({ emailList, onSelectEmail, loading, ...props }) => {
  console.log("received emailList: ", emailList);
  return (
    <EmailPreviewPanelStyled>
      {emailList?.map(
        ({
          senderAvt,
          sender,
          title,
          time,
          content,
          id,
          senderInfo,
          receiverInfo,
        }) => (
          <EmailPreview
            key={`${sender}-${id}`}
            // senderAvt={senderAvt}
            // senderName={sender}
            senderInfo={senderInfo || receiverInfo}
            cardTitle={title}
            // time={time}
            cardContent={content}
          />
        )
      )}
    </EmailPreviewPanelStyled>
  );
};

export default EmailPreviewPanel;
