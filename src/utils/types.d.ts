import "vite/client";

type ConnectButtonProps = {
  connect: () => Promise<void>;
};

type ConnectedButtonProps = {
  address: string | undefined;
};

type DreamFormData = {
  text: string;
  image?: string;
  public: boolean;
};

interface AvatarProps {
  address?: string;
  className?: string;
}

interface GeneratedImageResponse {
  created: EpochTimeStamp;
  data: [
    {
      b64_json: string;
      revised_prompt?: string;
    }
  ];
}

interface GeneratedTextResponse {
  id: string;
  object: "chat.completion";
  created: EpochTimeStamp;
  model: string;
  system_fingerprint: string;
  choices: [
    {
      index: number;
      message: {
        role: "user" | "assistant";
        content: string;
      };
      finish_reason: "stop" | "length" | "content_filter" | "tool_calls";
    }
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export type {
  ConnectedButtonProps,
  ConnectButtonProps,
  DreamFormData,
  AvatarProps,
  GeneratedImageResponse,
  GeneratedTextResponse,
};
