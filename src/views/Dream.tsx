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

const Dream = () => {
  const { id } = useParams();
  const dreamModel = modelParser.getModelByName("dream");
  const { pkh, filesMap: dreams } = useStore();
  const [dream, setDream] = useState<DreamFile>();
  const [emotion, setEmotion] = useState<{ value: string; label: string }>();

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
      setDream(result[id] as DreamFile);
      setEmotion(
        emotions.filter(
          (emotion) =>
            emotion.value === result[id]?.fileContent?.content?.emotion
        )[0]
      );
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
    <section className="container relative flex flex-col gap-5 lg:-my-5 lg:max-w-[600px] lg:border-x lg:py-5">
      {/* ----- DREAM DESCRIPTION ----- */}
      <div>
        <div className="flex items-center">
          <Bed className="mr-2 h-4 w-4" />
          <strong>Dream description</strong>
        </div>
        <p className="mt-3 border-l-4 py-3 pl-3">
          {dream?.fileContent?.content?.text}
        </p>
      </div>
      {/* ----- DREAM IMAGE ----- */}
      <div className="relative">
        <img
          src={dream?.fileContent?.content?.image}
          alt="Dream illustration"
          className="rounded"
        />
        {dream?.fileContent?.content?.public === false && (
          <div className="absolute left-0 right-0 top-0 m-3">
            <Button variant="outline" disabled size="sm">
              <LockKeyhole className="mr-2 h-4 w-4" />
              Private
            </Button>
          </div>
        )}
      </div>
      {/* ----- DREAM DATE ----- */}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-slate-400" />
        <small>
          <span className="text-slate-400">This was dreamt at </span>
          {new Date(dream?.fileContent?.content?.date!).toLocaleDateString()}
          <span className="text-slate-400"> and submitted at </span>
          {new Date(
            dream?.fileContent?.content?.createdAt!
          ).toLocaleDateString()}
        </small>
      </div>
      {/* ----- EMOTIONS ----- */}
      <div className="flex flex-col">
        <strong className="mb-1 text-xs text-slate-400">Emotions:</strong>
        <p>{emotion?.value}</p>
        <small>{emotion?.label}</small>
      </div>
      {/* ----- INTERPRETATION ----- */}
      <div className="rounded bg-white/10 p-4">
        <div className="mb-2 flex items-center">
          <Sparkles className="mr-2 h-4 w-4" />
          <strong className="text-xss mb-1 text-slate-400">
            Interpretation:
          </strong>
        </div>
        <p className="leading-relaxed">
          {dream?.fileContent?.content?.interpretation}
        </p>
      </div>
    </section>
  );
};

export default Dream;
