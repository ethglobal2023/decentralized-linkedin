import {
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  readReceiptContentTypeConfig,
  replyContentTypeConfig,
  XMTPProvider,
} from "@xmtp/react-sdk";

const DB_VERSION = 1;

const contentTypeConfigs = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  readReceiptContentTypeConfig,
  replyContentTypeConfig,
];

export const XMTPProviderWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <XMTPProvider
      dbVersion={DB_VERSION}
      contentTypeConfigs={contentTypeConfigs}
    >
      {children}
    </XMTPProvider>
  );
};
