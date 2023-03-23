import React, { Suspense } from "react";
import styled from "styled-components";
import { EmailPreview } from "components";
import { InkBallLoading } from "components";
const EmailPreviewPanelStyled = styled.div`
  /* min-width: 40rem; */
  width: 100%;
  overflow-y: auto;
`;
const EmailPreviewPanel = ({
  emailList,
  onSelectEmail,
  loading,
  selectEmail,
  ...props
}) => {
  console.log("received emailList: ", emailList);
  return (
    <EmailPreviewPanelStyled>
      {emailList?.map((email, index) => {
        const { sender, title, content, id, senderInfo, receiverInfo } = email;
        return (
          <EmailPreview
            key={`${sender}-${id}`}
            {...email}
            onSelectEmail={() => selectEmail({ ...email, index })}
          />
        );
      })}
    </EmailPreviewPanelStyled>
  );
};

export default EmailPreviewPanel;
