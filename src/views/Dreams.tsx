import React, { useCallback, useState } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import {
  useCreateIndexFile,
  useFeedsByAddress,
  useStore,
} from "@dataverse/hooks";
import { DreamFormData } from "../utils/types";

const modelParser = new ModelParser(app as Output);

export const Dreams = () => {
  const dreamModel = modelParser.getModelByName("dream");
  const { pkh } = useStore();

  const { loadFeedsByAddress } = useFeedsByAddress({
    model: dreamModel,
    onError: (error) => {
      console.error("[loadPosts]load files failed,", error);
    },
    onSuccess: (result) => {
      console.log("[loadPosts]load files success, result:", result);
    },
  });

  const loadDreams = useCallback(async () => {
    if (!dreamModel) {
      console.error("postModel undefined");
      return;
    }
    if (!pkh) {
      console.error("pkh undefined");
      return;
    }

    await loadFeedsByAddress(pkh);
  }, [dreamModel, pkh, loadFeedsByAddress]);

  return (
    <div>
      Dreams <button onClick={loadDreams}>load dreams</button>
    </div>
  );
};
