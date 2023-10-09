import * as react from 'react';
import { CachedConversation, CachedMessage } from '@xmtp/react-sdk';

type AddressInputProps = {
    /**
     * What, if any, ARIA label should be used for the text input
     */
    ariaLabel?: string;
    /**
     * What, if any, resolved address is there?
     */
    resolvedAddress?: {
        displayAddress: string;
        walletAddress?: string;
    };
    /**
     * What, if any, subtext is there?
     */
    subtext?: string;
    /**
     * What are the props associated with the avatar?
     */
    avatarUrlProps?: {
        avatarUrl?: string;
        isLoading?: boolean;
        address?: string;
    };
    /**
     * What, if any, label should be used?
     */
    label?: string;
    /**
     * What happens on a submit?
     */
    onChange?: (value: string) => void;
    /**
     * Upon submit, has there been an error?
     */
    isError?: boolean;
    /**
     * Upon submit, is something loading?
     */
    isLoading?: boolean;
    /**
     * Is there a tooltip click event that needs to be handled?
     */
    onTooltipClick?: () => void;
    /**
     * Input Value
     */
    value?: string;
    /**
     * Is there a left icon click event that needs to be handled?
     */
    onLeftIconClick?: () => void;
};
declare const AddressInput: react.ForwardRefExoticComponent<AddressInputProps & react.RefAttributes<HTMLInputElement>>;

type AvatarProps = {
    /**
     * Are we waiting on an avatar url?
     */
    isLoading?: boolean;
    /**
     * What, if any, avatar url is there?
     */
    url?: string;
    /**
     * What is the address associated with this avatar?
     */
    address?: string;
};
declare const Avatar: React.FC<AvatarProps>;

type ConversationListProps = {
    /**
     * What conversations should we render?
     */
    conversations?: React.ReactNode[];
    /**
     * Are we waiting on anything loading?
     */
    isLoading?: boolean;
    /**
     * What should we render when there are no conversations?
     */
    renderEmpty?: React.ReactNode;
};
declare const ConversationList: React.FC<ConversationListProps>;

type DateDividerProps = {
    /**
     * What date should be displayed in the divider?
     */
    date: Date;
};
declare const DateDivider: React.FC<DateDividerProps>;

type MessagesProps = {
    conversation: CachedConversation;
    /**
     * What's the client's wallet address?
     */
    clientAddress?: string;
    /**
     * Are the messages loading?
     */
    isLoading?: boolean;
    /**
     * What messages should be displayed?
     */
    messages?: CachedMessage[];
};
declare const Messages: React.FC<MessagesProps>;

type MessageProps = {
    conversation: CachedConversation;
    /**
     * The message to display
     */
    message: CachedMessage;
    /**
     * Is this an incoming message?
     */
    isIncoming?: boolean;
    isRead?: boolean;
};
declare const Message: React.FC<MessageProps>;

type IconButtonProps = {
    /**
     * What are the button contents?
     */
    label: React.ReactNode;
    /**
     * Is this a round or message shape of the button?
     */
    variant?: "primary" | "secondary";
    /**
     * How large is this button?
     */
    size?: "small" | "large";
    /**
     * Should the button display a loading state?
     */
    isLoading?: boolean;
    /**
     * Should the button be disabled?
     */
    isDisabled?: boolean;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /**
     * What should the screen reader text show?
     */
    srText?: string;
    /**
     * What is the test id associated with this button?
     */
    testId?: string;
};
/**
 * Icon-only button component
 */
declare const IconButton: React.FC<IconButtonProps>;

type ButtonLoaderProps = {
    /**
     * What color should the loader/spinner be?
     */
    color?: "primary" | "secondary";
    /**
     * How large is this button?
     */
    size?: "small" | "large";
};
/**
 * Primary UI component for user interaction
 */
declare const ButtonLoader: React.FC<ButtonLoaderProps>;

type MessageInputProps = {
    /**
     * Is the CTA button disabled?
     */
    isDisabled?: boolean;
    /**
     * What happens on a submit?
     */
    onSubmit?: (msg: string) => Promise<void>;
    /**
     * What, if any, placeholder should we use for the input?
     */
    placeholder?: string;
    /**
     * What, if any, screen reader text should be used for the submit button
     */
    submitSrText?: string;
};
declare const MessageInput: react.ForwardRefExoticComponent<MessageInputProps & react.RefAttributes<HTMLTextAreaElement>>;

type ConversationPreviewCardProps = {
    /**
     * Conversation to preview
     */
    conversation: CachedConversation;
    /**
     * What is the last message of this conversation?
     */
    lastMessage?: CachedMessage;
    /**
     * What happens on message click?
     */
    onClick?: (conversation: CachedConversation) => void;
    /**
     * Is conversation selected?
     */
    isSelected?: boolean;
};
declare const ConversationPreviewCard: React.FC<ConversationPreviewCardProps>;

type ReactionsBarProps = {
    conversation: CachedConversation;
    message: CachedMessage;
};
declare const ReactionsBar: React.FC<ReactionsBarProps>;

type ConversationPreviewProps = {
    /**
     * Conversation to preview
     */
    conversation: CachedConversation;
    /**
     * Is conversation selected?
     */
    isSelected?: boolean;
    /**
     * What happens when you click on the conversation?
     */
    onClick?: (conversation: CachedConversation) => void;
    /**
     * Preview text to display
     */
    lastMessage?: CachedMessage;
};
/**
 * This component fetches the most recent conversation message and uses it to
 * render a conversation preview.
 */
declare const ConversationPreview: React.FC<ConversationPreviewProps>;

type ConversationPreviewListProps = Pick<ConversationListProps, "isLoading" | "renderEmpty"> & {
    /**
     * What conversations should we render?
     */
    conversations?: CachedConversation[];
    /**
     * What happens when a conversation is clicked?
     */
    onConversationClick?: (conversation: CachedConversation) => void;
    /**
     * What, if any, conversation is selected
     */
    selectedConversation?: CachedConversation;
};
/**
 * This component sorts conversations by most recent, then lists them as
 * conversation previews, which include the conversation's first message.
 */
declare const ConversationPreviewList: React.FC<ConversationPreviewListProps>;

/**
 * Shorten a wallet address that is more than 10 characters.
 * Address must start with `0x`.
 */
declare const shortAddress: (addr: string) => string;

export { AddressInput, Avatar, ButtonLoader, ConversationList, ConversationPreview, ConversationPreviewCard, ConversationPreviewList, DateDivider, IconButton, Message, MessageInput, Messages, ReactionsBar, shortAddress };
