import React, { useCallback } from "react";
import { useApp, useStore } from "@dataverse/hooks";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import shortenAddress from "../utils/shortenAddress";
import { ConnectButtonProps, ConnectedButtonProps } from "../utils/types";

const modelParser = new ModelParser(app as Output);

const ConnectButton = (props: ConnectButtonProps) => {
  return (
    <>
      <button onClick={props.connect}>connect</button>
    </>
  );
};

const connectedButton = (props: ConnectedButtonProps) => {
  return (
    <>
      <button>connected: {shortenAddress(props.address!)}</button>
    </>
  );
};

const AccountButton = () => {
  const { pkh, address } = useStore();
  const { connectApp } = useApp({
    appId: modelParser.appId,
    autoConnect: true,
    onSuccess: (result: any) => {
      console.log("[connect]connect app success, result:", result);
    },
  });
  const connect = useCallback(async () => {
    connectApp();
  }, [connectApp]);

  return pkh && address
    ? connectedButton({ address })
    : ConnectButton({ connect });
};

export default AccountButton;
