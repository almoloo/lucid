import React, { useCallback, useEffect, useState } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import { useFeeds } from "@dataverse/hooks";
import { DreamFile } from "../utils/types";
import { Bed, Calendar, HeartCrack, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const modelParser = new ModelParser(app as Output);

const Explore = () => {
  const dreamModel = modelParser.getModelByName("dream");
  const [dreamList, setDreamList] = useState<DreamFile[]>();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { loadFeeds } = useFeeds({
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
      if (!result) {
        return;
      }
      setDreamList(Object.values(result) as DreamFile[]);
      setLoading(false);
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
    await loadFeeds();
  }, [dreamModel, loadFeeds]);

  useEffect(() => {
    loadDreams();
  }, []);

  return (
    <div className="flex grow flex-col gap-5">
      {/* ----- HEADING ----- */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="mb-2 flex items-center text-xl font-bold">
            <Sparkles className="mr-2 h-5 w-5 text-slate-400" />
            Explore
          </h1>
          <small className="text-xs text-slate-500">
            Explore a collection of dreams shared by the community. Delve into
            the rich tapestry of experiences, emotions, and narratives woven
            within these public dream entries. Join the exploration, find
            connections, and witness the diversity of dreamscapes.
          </small>
        </div>
      </section>
      {loading ? (
        <div className="flex grow items-center justify-center">
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="animate-pulse">Loading Dreams...</span>
          </div>
        </div>
      ) : dreamList?.some((entry) => entry.fileContent?.content?.public) ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {dreamList?.map(
            (entry) =>
              entry.fileContent?.content?.public && (
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
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 p-3 text-sm lg:translate-y-full lg:opacity-0 lg:transition-all lg:duration-200 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                        <Bed className="mb-2 h-4 w-4" />
                        <p className="font-serif leading-relaxed">
                          {entry?.fileContent?.content?.text.length! > 64 ? (
                            <>
                              {entry?.fileContent?.content?.text.substring(
                                0,
                                64
                              )}
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
                          <span className="text-slate-400">
                            {" "}
                            and submitted at{" "}
                          </span>
                          {new Date(
                            entry?.fileContent?.content?.createdAt!
                          ).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </a>
                </>
              )
          )}
        </section>
      ) : (
        <section className="flex grow items-center justify-center">
          <div className="flex items-center text-slate-500">
            <HeartCrack className="mr-2 h-4 w-4" />
            <small>No dreams have been created yet.</small>
          </div>
        </section>
      )}
    </div>
  );
};

export default Explore;
