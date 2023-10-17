import { useConversations, useStreamConversations } from "@xmtp/react-sdk";
import type { CachedConversation } from "@xmtp/react-sdk";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { ConversationList } from "@xmtp/react-components";
import { Notification } from "./Notification";
import { ConversationCard } from "./ConversationCard";

type ConversationsProps = {
  selectedConversation?: CachedConversation;
  onConversationClick?: (conversation: CachedConversation) => void;
};

const NoConversations: React.FC = () => (
  <Notification icon={<ChatBubbleLeftIcon />} title="No conversations found" >
    <div className="max-w-[350px]">It looks like you don&rsquo;t have any conversations yet. Create one to get
    started</div>
  </Notification>
);

export const Conversations: React.FC<ConversationsProps> = ({
  onConversationClick,
  selectedConversation,
}) => {
  const { conversations, isLoading } = useConversations();
  useStreamConversations();

  const previews = conversations.map((conversation) => (
    <ConversationCard
      key={conversation.topic}
      conversation={conversation}
      isSelected={conversation.topic === selectedConversation?.topic}
      onConversationClick={onConversationClick}
    />
  ));

  return (
    <ConversationList
      isLoading={isLoading}
      conversations={previews}
      renderEmpty={<NoConversations />}
    />
  );
};
