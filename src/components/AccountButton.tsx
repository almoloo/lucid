import React, { useCallback, useState } from "react";
import { useApp, useStore } from "@dataverse/hooks";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import shortenAddress from "../utils/shortenAddress";
import { ConnectButtonProps, ConnectedButtonProps } from "../utils/types";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import UserAvatar from "./UserAvatar";
import { Loader2, Wallet } from "lucide-react";

const modelParser = new ModelParser(app as Output);

const AccountButton = () => {
  const { pkh, address } = useStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { connectApp } = useApp({
    appId: modelParser.appId,
    autoConnect: true,
    onSuccess: (result: any) => {
      console.log("[connect]connect app success, result:", result);
    },
    onError(error) {
      console.log(error);
    },
  });
  const connect = useCallback(async () => {
    try {
      setLoading(true);
      await connectApp();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error connecting wallet",
        description:
          "Please make sure that you have installed Dataverse wallet extension on your browser.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [connectApp]);

  const ConnectButton = (props: ConnectButtonProps) => {
    return (
      <>
        <Button
          variant={"secondary"}
          onClick={props.connect}
          disabled={loading}
          className={loading ? "cursor-wait" : ""}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wallet className="mr-2 h-4 w-4" />
          )}
          Connect Wallet
        </Button>
      </>
    );
  };

  const connectedButton = (props: ConnectedButtonProps) => {
    return (
      <>
        <Button variant={"outline"}>
          <UserAvatar address={props.address} className="mr-3 h-6 w-6" />
          <div className="flex flex-col items-start">
            <small
              className="text-xs font-light text-emerald-300"
              style={{ fontVariant: "all-petite-caps" }}
            >
              connected
            </small>
            <small className="text-xs font-medium">
              {shortenAddress(props.address!)}
            </small>
          </div>
        </Button>
      </>
    );
  };

  return pkh && address
    ? connectedButton({ address })
    : ConnectButton({ connect });
};

export default AccountButton;
