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

export type {
  ConnectedButtonProps,
  ConnectButtonProps,
  DreamFormData,
  AvatarProps,
};
