import { ChevronLeftIcon, InformationCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { forwardRef, useCallback, useRef, useImperativeHandle, useState, useLayoutEffect, useMemo, Fragment } from 'react';
import Blockies from 'react-18-blockies';
import { jsxs, jsx, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { format, isSameDay, isBefore, formatDistanceToNowStrict, isAfter } from 'date-fns';
import { useSendMessage, ContentTypeId, getReadReceipt, getAttachment, ContentTypeText, useReply, useClient, useReactions, useAttachment } from '@xmtp/react-sdk';
import { ContentTypeReply } from '@xmtp/content-type-reply';
import { ContentTypeAttachment, ContentTypeRemoteAttachment } from '@xmtp/content-type-remote-attachment';
import { ContentTypeReaction } from '@xmtp/content-type-reaction';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

// src/components/AddressInput.tsx

// css-module:./Avatar.module.css#css-module
var Avatar_module_default = { "loading": "_loading_652o7_6 pulse", "avatar": "_avatar_652o7_14", "blockies": "_blockies_652o7_21" };
var Avatar = ({ url, isLoading, address }) => {
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: Avatar_module_default.loading });
  }
  if (url) {
    return /* @__PURE__ */ jsx("img", { className: Avatar_module_default.avatar, src: url, alt: address });
  }
  if (!address) {
    return /* @__PURE__ */ jsx("div", { className: Avatar_module_default.avatar });
  }
  return /* @__PURE__ */ jsx(
    Blockies,
    {
      "data-testid": "avatar",
      seed: address || "",
      scale: 5,
      size: 8,
      className: Avatar_module_default.blockies
    }
  );
};

// css-module:./ShortCopySkeletonLoader.module.css#css-module
var ShortCopySkeletonLoader_module_default = { "wrapper": "_wrapper_ng5ay_1 pulse", "element": "_element_ng5ay_6", "element1Line": "_element1Line_ng5ay_11", "element2Lines": "_element2Lines_ng5ay_16" };
var ShortCopySkeletonLoader = ({ lines = 1 }) => /* @__PURE__ */ jsx("div", { role: "status", className: ShortCopySkeletonLoader_module_default.wrapper, children: lines === 1 ? /* @__PURE__ */ jsx("div", { className: `${ShortCopySkeletonLoader_module_default.element} ${ShortCopySkeletonLoader_module_default.element1Line}` }) : /* @__PURE__ */ jsxs("div", { className: ShortCopySkeletonLoader_module_default.element2Lines, children: [
  /* @__PURE__ */ jsx("div", { className: ShortCopySkeletonLoader_module_default.element }),
  /* @__PURE__ */ jsx("div", { className: ShortCopySkeletonLoader_module_default.element })
] }) });

// css-module:./AddressInput.module.css#css-module
var AddressInput_module_default = { "wrapper": "_wrapper_82p7z_6", "resolved": "_resolved_82p7z_15", "element": "_element_82p7z_20", "label": "_label_82p7z_26 text-sm", "control": "_control_82p7z_32", "input": "_input_82p7z_40 text-md text-sm", "resolvedAddress": "_resolvedAddress_82p7z_54", "displayAddress": "_displayAddress_82p7z_62", "walletAddress": "_walletAddress_82p7z_67", "subtext": "_subtext_82p7z_73", "error": "_error_82p7z_80", "leftIcon": "_leftIcon_82p7z_90" };
var AddressInput = forwardRef(
  ({
    ariaLabel,
    resolvedAddress,
    subtext,
    avatarUrlProps,
    onChange,
    isError,
    isLoading,
    label,
    onLeftIconClick,
    onTooltipClick,
    value
  }, ref) => {
    const handleChange = useCallback(
      (event) => {
        onChange?.(event.target.value);
      },
      [onChange]
    );
    const isResolvedAddress = !!resolvedAddress?.displayAddress;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `${AddressInput_module_default.wrapper} ${isResolvedAddress ? AddressInput_module_default.resolved : ""}`,
        children: [
          onLeftIconClick && /* @__PURE__ */ jsx("div", { className: AddressInput_module_default.leftIcon, children: /* @__PURE__ */ jsx(ChevronLeftIcon, { onClick: onLeftIconClick, width: 24 }) }),
          /* @__PURE__ */ jsxs("div", { className: AddressInput_module_default.element, children: [
            /* @__PURE__ */ jsx("div", { className: AddressInput_module_default.label, children: label }),
            /* @__PURE__ */ jsx(Avatar, { ...avatarUrlProps }),
            /* @__PURE__ */ jsxs("div", { className: AddressInput_module_default.control, children: [
              isLoading ? /* @__PURE__ */ jsx(ShortCopySkeletonLoader, { lines: 1 }) : resolvedAddress?.displayAddress ? /* @__PURE__ */ jsxs("div", { className: AddressInput_module_default.resolvedAddress, children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: AddressInput_module_default.displayAddress,
                    "data-testid": "recipient-wallet-address",
                    children: resolvedAddress.displayAddress
                  }
                ),
                resolvedAddress.walletAddress && /* @__PURE__ */ jsx("span", { className: AddressInput_module_default.walletAddress, children: resolvedAddress.walletAddress })
              ] }) : /* @__PURE__ */ jsx(
                "input",
                {
                  "data-testid": "message-to-input",
                  tabIndex: 0,
                  className: AddressInput_module_default.input,
                  id: "address",
                  type: "text",
                  spellCheck: "false",
                  autoComplete: "false",
                  autoCorrect: "false",
                  autoCapitalize: "off",
                  onChange: handleChange,
                  value,
                  "aria-label": ariaLabel,
                  ref
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `${AddressInput_module_default.subtext} ${isError ? AddressInput_module_default.error : ""}`,
                  "data-testid": "message-to-subtext",
                  children: subtext
                }
              )
            ] })
          ] }),
          onTooltipClick && /* @__PURE__ */ jsx(InformationCircleIcon, { onClick: onTooltipClick, height: "24" })
        ]
      }
    );
  }
);
AddressInput.displayName = "AddressInput";

// css-module:./ConversationList.module.css#css-module
var ConversationList_module_default = { "loading": "_loading_1s609_6", "empty": "_empty_1s609_13", "wrapper": "_wrapper_1s609_18" };

// css-module:./ConversationPreviewCard.module.css#css-module
var ConversationPreviewCard_module_default = { "wrapper": "_wrapper_9fip8_1", "selected": "_selected_9fip8_10", "loading": "_loading_9fip8_14", "element": "_element_9fip8_18", "domain": "_domain_9fip8_26 text-sm", "address": "_address_9fip8_35 text-md", "message": "_message_9fip8_44 text-md", "time": "_time_9fip8_56 text-xs" };

// css-module:./IconSkeletonLoader.module.css#css-module
var IconSkeletonLoader_module_default = { "wrapper": "_wrapper_2nuo1_1 pulse", "element": "_element_2nuo1_7" };
var IconSkeletonLoader = () => /* @__PURE__ */ jsx("div", { role: "status", className: IconSkeletonLoader_module_default.wrapper, children: /* @__PURE__ */ jsx("div", { className: IconSkeletonLoader_module_default.element }) });
var DefaultEmptyMessage = () => /* @__PURE__ */ jsx("div", { children: "No conversations!" });
var ConversationList = ({
  conversations = [],
  isLoading,
  renderEmpty = /* @__PURE__ */ jsx(DefaultEmptyMessage, {})
}) => {
  if (isLoading && !conversations.length) {
    return /* @__PURE__ */ jsxs("div", { className: ConversationPreviewCard_module_default.wrapper, children: [
      /* @__PURE__ */ jsx(Avatar, { isLoading: true }),
      /* @__PURE__ */ jsx("div", { className: ConversationPreviewCard_module_default.element, children: /* @__PURE__ */ jsx(ShortCopySkeletonLoader, { lines: 2 }) }),
      /* @__PURE__ */ jsx(IconSkeletonLoader, {})
    ] });
  }
  if (!conversations.length && !isLoading) {
    return /* @__PURE__ */ jsx("div", { className: ConversationList_module_default.empty, children: renderEmpty });
  }
  return /* @__PURE__ */ jsx("div", { className: ConversationList_module_default.wrapper, "data-testid": "conversations-list-panel", children: conversations });
};

// css-module:./DateDivider.module.css#css-module
var DateDivider_module_default = { "wrapper": "_wrapper_gcqk3_1", "date": "_date_gcqk3_16" };
var DateDivider = ({ date }) => /* @__PURE__ */ jsx("div", { className: DateDivider_module_default.wrapper, children: /* @__PURE__ */ jsx("div", { className: DateDivider_module_default.date, title: date.toDateString(), children: format(date, "PPP") }) });

// css-module:./MessageSkeletonLoader.module.css#css-module
var MessageSkeletonLoader_module_default = { "wrapper": "_wrapper_igutw_1 pulse", "section": "_section_igutw_5", "sectionRight": "_sectionRight_igutw_11", "element": "_element_igutw_16", "elementSmall": "_elementSmall_igutw_22", "elementMedium": "_elementMedium_igutw_26", "elementLarge": "_elementLarge_igutw_30", "elementLast": "_elementLast_igutw_34" };
var MessageSkeletonLoader = ({ incoming = true }) => /* @__PURE__ */ jsx("div", { role: "status", className: MessageSkeletonLoader_module_default.wrapper, children: incoming ? /* @__PURE__ */ jsxs("div", { className: MessageSkeletonLoader_module_default.section, children: [
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementSmall}` }),
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementLarge}` }),
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementMedium}` }),
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementLast}` })
] }) : /* @__PURE__ */ jsxs("div", { className: `${MessageSkeletonLoader_module_default.section} ${MessageSkeletonLoader_module_default.sectionRight}`, children: [
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementSmall}` }),
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementLarge}` }),
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementMedium}` }),
  /* @__PURE__ */ jsx("div", { className: `${MessageSkeletonLoader_module_default.element} ${MessageSkeletonLoader_module_default.elementLast}` })
] }) });

// css-module:./Message.module.css#css-module
var Message_module_default = { "wrapper": "_wrapper_hnmk8_1", "left": "_left_hnmk8_11", "right": "_right_hnmk8_15", "content": "_content_hnmk8_19", "time": "_time_hnmk8_27", "readReceipt": "_readReceipt_hnmk8_36", "reactions": "_reactions_hnmk8_40" };

// css-module:./Attachment.module.css#css-module
var Attachment_module_default = { "attachment": "_attachment_m6zqf_1" };
var blobCache = /* @__PURE__ */ new WeakMap();
var getBlobURL = (attachment) => {
  if (!blobCache.get(attachment.data)) {
    blobCache.set(
      attachment.data,
      URL.createObjectURL(
        new Blob([Buffer.from(attachment.data)], {
          type: attachment.mimeType
        })
      )
    );
  }
  return blobCache.get(attachment.data);
};
var AttachmentContent = ({ message }) => {
  const { attachment, status } = useAttachment(message);
  if (status === "error") {
    return "Unable to load attachment";
  }
  if (status === "loading" || !attachment) {
    return "Loading...";
  }
  const blobURL = getBlobURL(attachment);
  if (attachment.mimeType.startsWith("image/")) {
    return /* @__PURE__ */ jsx("div", { className: Attachment_module_default.attachment, children: /* @__PURE__ */ jsx("img", { src: blobURL, alt: "" }) });
  }
  if (attachment.mimeType.startsWith("audio/")) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      /* @__PURE__ */ jsx("audio", { controls: true, src: blobURL, children: /* @__PURE__ */ jsx("a", { href: blobURL, children: "Download instead" }) })
    );
  }
  if (attachment.mimeType.startsWith("video/")) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      /* @__PURE__ */ jsxs("video", { controls: true, autoPlay: true, children: [
        /* @__PURE__ */ jsx("source", { src: blobURL, type: "video/mp4" }),
        "Video messages not supported."
      ] })
    );
  }
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: blobURL, target: "_blank", rel: "noopener noreferrer", children: attachment.filename }) });
};

// css-module:./MessageContent.module.css#css-module
var MessageContent_module_default = { "content": "_content_9xkgj_1", "left": "_left_9xkgj_10", "right": "_right_9xkgj_15", "original": "_original_9xkgj_21" };
var MessageContent = ({
  message,
  isIncoming,
  isRepliedTo
}) => {
  const contentType = ContentTypeId.fromString(message.contentType);
  let content;
  if (contentType.sameAs(ContentTypeText)) {
    if (typeof message.content === "string")
      content = typeof message.content === "string" ? message.content : void 0;
  }
  if (contentType.sameAs(ContentTypeAttachment) || contentType.sameAs(ContentTypeRemoteAttachment)) {
    content = /* @__PURE__ */ jsx(AttachmentContent, { message });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${MessageContent_module_default.content} ${MessageContent_module_default[isIncoming ? "left" : "right"]} ${isRepliedTo ? MessageContent_module_default.original : ""}`,
      "data-testid": "message-tile-text",
      children: content ?? message.contentFallback ?? "This content is not supported by this client"
    }
  );
};
var ReplyContent = ({ message, isIncoming }) => {
  const { originalMessage } = useReply(message);
  const reply = message.content;
  const replyMessage = {
    ...message,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    content: reply.content,
    contentType: new ContentTypeId(reply.contentType).toString()
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("div", { children: originalMessage ? /* @__PURE__ */ jsx(
      MessageContent,
      {
        message: originalMessage,
        isIncoming,
        isRepliedTo: true
      }
    ) : "Loading original message..." }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(MessageContent, { message: replyMessage, isIncoming }) })
  ] });
};

// css-module:./ReactionsBar.module.css#css-module
var ReactionsBar_module_default = { "wrapper": "_wrapper_l3px9_1", "option": "_option_l3px9_11" };
var availableReactionEmojis = ["\u{1F44D}", "\u{1F44E}", "\u2764\uFE0F"];
var ReactionsBar = ({
  conversation,
  message
}) => {
  const { sendMessage } = useSendMessage();
  const handleClick = useCallback(
    (emoji) => {
      void sendMessage(
        conversation,
        {
          content: emoji,
          schema: "unicode",
          reference: message.xmtpID,
          action: "added"
        },
        ContentTypeReaction
      );
    },
    [conversation, message.xmtpID, sendMessage]
  );
  return /* @__PURE__ */ jsx("div", { className: ReactionsBar_module_default.wrapper, children: availableReactionEmojis.map((emoji) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: ReactionsBar_module_default.option,
      onClick: () => handleClick(emoji),
      children: /* @__PURE__ */ jsx("span", { className: ReactionsBar_module_default.emoji, children: emoji })
    },
    emoji
  )) });
};

// css-module:./ReactionsContent.module.css#css-module
var ReactionsContent_module_default = { "wrapper": "_wrapper_1i67j_1", "option": "_option_1i67j_8", "count": "_count_1i67j_23", "active": "_active_1i67j_28" };
var availableReactionEmojis2 = ["\u{1F44D}", "\u{1F44E}", "\u2764\uFE0F"];
var ReactionsContent = ({
  conversation,
  message
}) => {
  const { client } = useClient();
  const { sendMessage } = useSendMessage();
  const reactions = useReactions(message);
  const emojiReactions = useMemo(
    () => reactions.filter((reaction) => reaction.schema === "unicode").reduce(
      (acc, reaction) => {
        const count = (acc?.[reaction.content]?.count ?? 0) + 1;
        const senderAddresses = acc?.[reaction.content]?.senderAddresses ?? [];
        return {
          ...acc,
          [reaction.content]: {
            count,
            senderAddresses: [...senderAddresses, reaction.senderAddress]
          }
        };
      },
      {}
    ),
    [reactions]
  );
  const emojiCount = useCallback(
    (emoji) => emojiReactions[emoji]?.count ?? 0,
    [emojiReactions]
  );
  const handleClick = useCallback(
    (emoji) => {
      const hasReacted = emojiReactions[emoji].senderAddresses.includes(
        client?.address ?? ""
      );
      void sendMessage(
        conversation,
        {
          content: emoji,
          schema: "unicode",
          reference: message.xmtpID,
          action: hasReacted ? "removed" : "added"
        },
        ContentTypeReaction
      );
    },
    [
      client?.address,
      conversation,
      emojiReactions,
      message.xmtpID,
      sendMessage
    ]
  );
  return reactions.length > 0 && /* @__PURE__ */ jsx("div", { className: ReactionsContent_module_default.wrapper, children: availableReactionEmojis2.map((emoji) => {
    const count = emojiCount(emoji);
    return count > 0 ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: `${ReactionsContent_module_default.option} ${ReactionsContent_module_default.active}`,
        onClick: () => handleClick(emoji),
        children: [
          /* @__PURE__ */ jsx("span", { className: ReactionsContent_module_default.emoji, children: emoji }),
          /* @__PURE__ */ jsx("span", { className: ReactionsContent_module_default.count, children: count })
        ]
      },
      emoji
    ) : null;
  }) });
};
var Message = ({
  conversation,
  message,
  isIncoming,
  isRead
}) => {
  const contentType = ContentTypeId.fromString(message.contentType);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${Message_module_default.wrapper} ${Message_module_default[isIncoming ? "left" : "right"]}`,
      children: [
        contentType.sameAs(ContentTypeReply) ? /* @__PURE__ */ jsx(ReplyContent, { message, isIncoming }) : /* @__PURE__ */ jsx(MessageContent, { message, isIncoming }),
        /* @__PURE__ */ jsxs("div", { className: Message_module_default.time, title: message.sentAt.toLocaleString(), children: [
          isRead && /* @__PURE__ */ jsx("span", { className: Message_module_default.readReceipt, children: "Read" }),
          /* @__PURE__ */ jsx("span", { children: format(message.sentAt, "h:mm a") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: Message_module_default.reactions, children: /* @__PURE__ */ jsx(ReactionsBar, { conversation, message }) }),
        /* @__PURE__ */ jsx(ReactionsContent, { conversation, message })
      ]
    }
  );
};

// css-module:./Messages.module.css#css-module
var Messages_module_default = { "wrapper": "_wrapper_9g5he_1", "loading": "_loading_9g5he_8", "beginning": "_beginning_9g5he_15" };
var hasMessageReadAfter = (messages, afterSent, readReceipt) => messages.some(
  (message) => isAfter(message.sentAt, afterSent) && isBefore(message.sentAt, readReceipt)
);
var Messages = ({
  clientAddress = "",
  conversation,
  isLoading = false,
  messages = []
}) => {
  const outgoingMessages = useMemo(
    () => messages.filter((message) => message.senderAddress === clientAddress),
    [messages, clientAddress]
  );
  if (isLoading && !messages.length) {
    return /* @__PURE__ */ jsx("div", { className: Messages_module_default.loading, children: Array.from({ length: 3 }).map((_, idx) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(MessageSkeletonLoader, { incoming: false }),
      " ",
      /* @__PURE__ */ jsx(MessageSkeletonLoader, {})
    ] }, idx)) });
  }
  const renderedDates = [];
  const readReceipt = getReadReceipt(conversation);
  return /* @__PURE__ */ jsx("div", { "data-testid": "message-tile-container", className: Messages_module_default.wrapper, children: messages.map((message, idx, filteredMessages) => {
    if (renderedDates.length === 0) {
      renderedDates.push(message.sentAt);
    }
    const lastRenderedDate = renderedDates.at(-1);
    const isIncoming = message.senderAddress !== clientAddress;
    const isOutgoing = message.senderAddress === clientAddress;
    const isFirstMessage = idx === 0;
    const isLastMessage = idx === filteredMessages.length - 1;
    const isSameDate = isSameDay(lastRenderedDate, message.sentAt);
    const shouldDisplayDate = isFirstMessage || isLastMessage || !isSameDate;
    if (shouldDisplayDate && !isLastMessage) {
      renderedDates.push(message.sentAt);
    }
    const isRead = (
      // conversation must have a valid read receipt, and...
      readReceipt && // this message must be outgoing, and...
      isOutgoing && // this message must be sent before the read receipt, and...
      isBefore(message.sentAt, readReceipt) && // this message is the last message, or...
      (isLastMessage || // the next outgoing message was sent after the read receipt
      !hasMessageReadAfter(
        outgoingMessages,
        message.sentAt,
        readReceipt
      ))
    );
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      shouldDisplayDate && /* @__PURE__ */ jsx(DateDivider, { date: renderedDates.at(-1) }),
      /* @__PURE__ */ jsx(
        Message,
        {
          conversation,
          message,
          isIncoming,
          isRead
        },
        message.id
      )
    ] }, message.id);
  }) });
};

// css-module:./ButtonLoader.module.css#css-module
var ButtonLoader_module_default = { "wrapper": "_wrapper_133pc_3", "light": "_light_133pc_7", "dark": "_dark_133pc_11", "element": "_element_133pc_15 spin", "elementSmall": "_elementSmall_133pc_22", "elementLarge": "_elementLarge_133pc_28" };
var ButtonLoader = ({
  size,
  color = "primary"
}) => /* @__PURE__ */ jsx("div", { className: ButtonLoader_module_default.wrapper, children: /* @__PURE__ */ jsx(
  "div",
  {
    className: `${ButtonLoader_module_default.element} ${color === "primary" ? ButtonLoader_module_default.light : ButtonLoader_module_default.dark} ${size === "small" ? ButtonLoader_module_default.elementSmall : ButtonLoader_module_default.elementLarge}`
  }
) });

// css-module:./IconButton.module.css#css-module
var IconButton_module_default = { "wrapper": "_wrapper_7iqve_1", "disabled": "_disabled_7iqve_19", "primary": "_primary_7iqve_28", "secondary": "_secondary_7iqve_36" };
var IconButton = ({
  label = /* @__PURE__ */ jsx(PlusCircleIcon, { width: "24", color: "white" }),
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  size = "large",
  srText,
  onClick,
  testId
}) => /* @__PURE__ */ jsx(
  "button",
  {
    "data-testid": testId,
    type: "button",
    onClick,
    disabled: isDisabled,
    className: `${IconButton_module_default.wrapper} ${IconButton_module_default[variant]} ${isDisabled ? IconButton_module_default.disabled : ""}`,
    "aria-label": srText,
    children: /* @__PURE__ */ jsx("div", { children: isLoading ? /* @__PURE__ */ jsx(ButtonLoader, { color: "primary", size }) : label })
  }
);

// css-module:./MessageInput.module.css#css-module
var MessageInput_module_default = { "label": "_label_1wlh2_1 visually-hidden", "wrapper": "_wrapper_1wlh2_5", "input": "_input_1wlh2_19" };
var MIN_TEXTAREA_HEIGHT = 32;
var MessageInput = forwardRef(
  ({ isDisabled, onSubmit, placeholder, submitSrText }, ref) => {
    const textAreaRef = useRef(null);
    useImperativeHandle(
      ref,
      () => textAreaRef.current
    );
    const [value, setValue] = useState("");
    const onChange = (event) => setValue(event.target.value);
    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          if (value) {
            void onSubmit?.(value);
            setValue("");
          }
        }
      },
      [onSubmit, value]
    );
    const handleClick = useCallback(() => {
      if (value) {
        void onSubmit?.(value);
        setValue("");
      }
    }, [onSubmit, value]);
    useLayoutEffect(() => {
      if (textAreaRef?.current?.value) {
        const currentScrollHeight = textAreaRef?.current.scrollHeight;
        textAreaRef.current.style.height = `${Math.max(
          currentScrollHeight,
          MIN_TEXTAREA_HEIGHT
        )}px`;
      } else if (textAreaRef?.current) {
        textAreaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
      }
    }, [value]);
    return /* @__PURE__ */ jsxs("div", { children: [
      placeholder && /* @__PURE__ */ jsx("label", { htmlFor: "chat", className: MessageInput_module_default.label, children: placeholder }),
      /* @__PURE__ */ jsxs("div", { className: MessageInput_module_default.wrapper, children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "chat",
            "data-testid": "message-input",
            onChange,
            onKeyDown: handleKeyDown,
            ref: textAreaRef,
            rows: 1,
            className: MessageInput_module_default.input,
            placeholder,
            value,
            disabled: isDisabled
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            testId: "message-input-submit",
            variant: "secondary",
            label: /* @__PURE__ */ jsx(ArrowUpIcon, { color: "white", width: "20" }),
            srText: submitSrText,
            onClick: handleClick,
            isDisabled: !value || isDisabled
          }
        )
      ] })
    ] });
  }
);
MessageInput.displayName = "MessageInput";

// src/helpers/shortAddress.ts
var shortAddress = (addr) => addr.length > 10 && addr.startsWith("0x") ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : addr;
var ConversationPreviewCard = ({ conversation, onClick, isSelected, lastMessage }) => {
  const attachment = lastMessage ? getAttachment(lastMessage) : void 0;
  let content;
  if (attachment) {
    content = attachment.filename;
  } else if (typeof lastMessage?.content === "string") {
    content = lastMessage.content;
  } else if (lastMessage?.contentFallback) {
    content = lastMessage.contentFallback;
  }
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onClick?.(conversation);
      }
    },
    [conversation, onClick]
  );
  const handleClick = useCallback(() => {
    onClick?.(conversation);
  }, [conversation, onClick]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${ConversationPreviewCard_module_default.wrapper} ${isSelected ? ConversationPreviewCard_module_default.selected : ""}`,
      role: "button",
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      children: [
        /* @__PURE__ */ jsx(Link, { to: `/profile/${conversation.peerAddress}`, children: /* @__PURE__ */ jsx(Avatar, { address: conversation.peerAddress }) }),
        /* @__PURE__ */ jsxs("div", { className: ConversationPreviewCard_module_default.element, children: [
          /* @__PURE__ */ jsx("div", { className: ConversationPreviewCard_module_default.address, children: shortAddress(conversation.peerAddress) }),
          /* @__PURE__ */ jsx("div", { className: ConversationPreviewCard_module_default.message, children: content })
        ] }),
        /* @__PURE__ */ jsx("div", { className: ConversationPreviewCard_module_default.time, children: lastMessage?.sentAt && `${formatDistanceToNowStrict(lastMessage.sentAt)} ago` })
      ]
    }
  );
};
var ConversationPreview = ({
  conversation,
  isSelected,
  onClick,
  lastMessage
}) => {
  const handlePreviewClick = useCallback(() => {
    onClick?.(conversation);
  }, [conversation, onClick]);
  return /* @__PURE__ */ jsx(
    ConversationPreviewCard,
    {
      conversation,
      isSelected,
      onClick: handlePreviewClick,
      lastMessage
    }
  );
};
var ConversationPreviewList = ({
  conversations = [],
  isLoading,
  onConversationClick,
  renderEmpty,
  selectedConversation
}) => {
  const conversationPreviews = conversations.map((conversation) => /* @__PURE__ */ jsx(
    ConversationPreview,
    {
      conversation,
      isSelected: conversation.topic === selectedConversation?.topic,
      onClick: onConversationClick
    },
    conversation.topic
  ));
  return /* @__PURE__ */ jsx(
    ConversationList,
    {
      conversations: conversationPreviews,
      isLoading,
      renderEmpty
    }
  );
};

export { AddressInput, Avatar, ButtonLoader, ConversationList, ConversationPreview, ConversationPreviewCard, ConversationPreviewList, DateDivider, IconButton, Message, MessageInput, Messages, ReactionsBar, shortAddress };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map