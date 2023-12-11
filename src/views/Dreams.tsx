import React, { useCallback, useEffect, useState } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import { useFeedsByAddress, useStore } from "@dataverse/hooks";
import { DreamFile } from "../utils/types";
import {
  Bed,
  Calendar,
  HeartCrack,
  Loader2,
  LockKeyhole,
  ScrollText,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const modelParser = new ModelParser(app as Output);

export const Dreams = () => {
  const dreamModel = modelParser.getModelByName("dream");
  const { pkh } = useStore();
  const [dreamList, setDreamList] = useState<DreamFile[]>();
  const [loading, setLoading] = useState(true);
  const [subtitle, setSubtitle] = useState("");
  const { toast } = useToast();

  const { loadFeedsByAddress } = useFeedsByAddress({
    model: dreamModel,
    onError: (error) => {
      console.error("[loadDreams]load files failed,", error);
      toast({
        title: "Error!",
        description: "Failed to load dream files",
        variant: "destructive",
      });
      setLoading(false);
    },
    onSuccess: (result) => {
      console.log("[loadDreams]load files success, result:", result);
      setLoading(false);
      setSubtitle(
        `You've had ${Object.values(result).length} dream${
          Object.values(result).length > 1 ? "s" : ""
        }`
      );
      if (!result) {
        return;
      }
      setDreamList(Object.values(result) as DreamFile[]);
    },
  });

  const loadDreams = useCallback(async () => {
    if (!dreamModel) {
      console.error("dreamModel undefined");
      toast({
        title: "Error!",
        description: "dreamModel undefined",
        variant: "destructive",
      });
      return;
    }
    if (!pkh) {
      console.error("pkh undefined");
      toast({
        title: "Error!",
        description: "pkh undefined",
        variant: "destructive",
      });
      return;
    }

    await loadFeedsByAddress(pkh);
  }, [dreamModel, pkh, loadFeedsByAddress]);

  useEffect(() => {
    loadDreams();
  }, []);

  return (
    <div className="flex grow flex-col gap-5">
      <section className="flex flex-col justify-between gap-4 lg:flex-row">
        {/* ----- HEADING ----- */}
        <div>
          <h1 className="flex items-center text-xl font-bold">
            <ScrollText className="mr-2 h-5 w-5 text-slate-400" />
            My dreams
          </h1>
          {subtitle !== "" && (
            <small className="text-xs text-slate-500">{subtitle}</small>
          )}
        </div>
      </section>
      {loading ? (
        <div className="flex grow items-center justify-center">
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="animate-pulse">Loading Dreams...</span>
          </div>
        </div>
      ) : dreamList?.length! > 0 ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {dreamList?.map((entry) => (
            <>
              <a
                href={`/dream/${entry.fileContent?.file?.fileId}`}
                className="group flex grid-cols-1 flex-col overflow-hidden rounded bg-white/10"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={entry.fileContent?.content?.image}
                    alt="dream illustration"
                    className="aspect-square w-full lg:origin-top-left lg:transition-all lg:group-hover:scale-150"
                  />
                  {entry?.fileContent?.content?.public === false && (
                    <div className="absolute left-0 right-0 top-0 m-3 text-xs text-slate-200">
                      <div className="inline-flex items-center rounded bg-slate-900/80 px-2 py-1">
                        <LockKeyhole className="mr-1 h-3 w-3" />
                        Private
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 p-3 text-sm lg:translate-y-full lg:opacity-0 lg:transition-all lg:duration-200 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <Bed className="mb-2 h-4 w-4" />
                    <p className="font-serif leading-relaxed">
                      {entry?.fileContent?.content?.text.length! > 64 ? (
                        <>
                          {entry?.fileContent?.content?.text.substring(0, 64)}
                          <span>...</span>
                        </>
                      ) : (
                        entry?.fileContent?.content?.text
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <small className="border-l-4 border-l-slate-700 pl-3">
                      <span className="text-slate-400">
                        This was dreamt at{" "}
                      </span>
                      {new Date(
                        entry?.fileContent?.content?.date!
                      ).toLocaleDateString()}
                      <span className="text-slate-400"> and submitted at </span>
                      {new Date(
                        entry?.fileContent?.content?.createdAt!
                      ).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </a>
            </>
          ))}
        </section>
      ) : (
        <section className="flex grow items-center justify-center">
          <div className="flex items-center text-slate-500">
            <HeartCrack className="mr-2 h-4 w-4" />
            <small>You haven't submitted any dreams yet</small>
          </div>
        </section>
      )}
    </div>
  );
};
