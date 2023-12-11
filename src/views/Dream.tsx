import React, { useCallback, useEffect, useState } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import { useFeedsByAddress, useStore } from "@dataverse/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { DreamFile } from "../utils/types";
import { Bed, Calendar, LockKeyhole, Sparkles } from "lucide-react";
import { emotions } from "./Create";
import { Button } from "@/components/ui/button";

const modelParser = new ModelParser(app as Output);

const Dream = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dreamModel = modelParser.getModelByName("dream");
  const { pkh, filesMap: dreams } = useStore();
  const [dream, setDream] = useState<DreamFile>();
  const [emotion, setEmotion] = useState<{ value: string; label: string }>();
  const [imageLoading, setImageLoading] = useState(false);

  const { loadFeedsByAddress } = useFeedsByAddress({
    model: dreamModel,
    onError: (error) => {
      console.error("[loadDreams]load files failed,", error);
    },
    onSuccess: (result) => {
      console.log("[loadDreams]load files success, result:", result);
      if (!result || Object.keys(result).length === 0) {
        navigate("/404");
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
        <p className="mt-3 border-l-4 py-3 pl-3 font-serif">
          {dream?.fileContent?.content?.text}
        </p>
      </div>
      {/* ----- DREAM IMAGE ----- */}
      <div className="relative">
        <div className="relative aspect-square rounded bg-slate-900">
          <img
            src={dream?.fileContent?.content?.image}
            alt="Dream illustration"
            className="relative z-10 rounded bg-slate-700"
          />
          <div className="absolute z-0 flex h-full w-full items-center justify-center text-xs">
            Uploading image to IPFS...
          </div>
        </div>
        {dream?.fileContent?.content?.public === false && (
          <div className="absolute left-0 right-0 top-0 m-3 text-xs text-slate-200">
            <div className="inline-flex items-center rounded bg-slate-900/80 px-2 py-1">
              <LockKeyhole className="mr-1 h-3 w-3" />
              Private
            </div>
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
