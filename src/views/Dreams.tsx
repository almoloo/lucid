import React, { useCallback, useEffect, useState } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import { useFeedsByAddress, useStore } from "@dataverse/hooks";
import { useParams } from "react-router-dom";
import { DreamFile } from "../utils/types";
import { Bed, Calendar, LockKeyhole, Sparkles } from "lucide-react";
import { emotions } from "./Create";
import { Button } from "@/components/ui/button";

const modelParser = new ModelParser(app as Output);

export const Dreams = () => {
  const dreamModel = modelParser.getModelByName("dream");
  const { pkh, filesMap: dreams } = useStore();
  const [dreamList, setDreamList] = useState<DreamFile[]>();

  const { loadFeedsByAddress } = useFeedsByAddress({
    model: dreamModel,
    onError: (error) => {
      console.error("[loadDreams]load files failed,", error);
    },
    onSuccess: (result) => {
      console.log("[loadDreams]load files success, result:", result);
      if (!result) {
        return;
      }
      setDreamList(Object.values(result) as DreamFile[]);
    },
  });

  const loadDreams = useCallback(async () => {
    if (!dreamModel) {
      console.error("dreamModel undefined");
      return;
    }
    if (!pkh) {
      console.error("pkh undefined");
      return;
    }

    await loadFeedsByAddress(pkh);
  }, [dreamModel, pkh, loadFeedsByAddress]);

  useEffect(() => {
    loadDreams();
  }, []);

  return (
    <div>
      {dreamList?.map((entry) => (
        <div className="mb-10">{JSON.stringify(entry)}</div>
      ))}
    </div>
  );
};
