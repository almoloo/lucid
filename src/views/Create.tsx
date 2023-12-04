import React, { useCallback, useState } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import { useCreateIndexFile, useStore } from "@dataverse/hooks";
import { DreamFormData } from "../utils/types";

const modelParser = new ModelParser(app as Output);

const Create = () => {
  const [currentFileId, setCurrentFileId] = useState<string>();
  const [formData, setFormData] = useState<DreamFormData>({
    text: "",
    image: "",
    public: true,
  });

  const dreamVersion = import.meta.env.VITE_DREAM_VERSION;
  const dreamModel = modelParser.getModelByName("dream");
  const { pkh } = useStore();

  const { createdIndexFile, createIndexFile } = useCreateIndexFile({
    onSuccess: (result) => {
      console.log("[createFile]create file success:", result);
      setCurrentFileId(result.fileContent.file.fileId);
    },
  });

  const createDream = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!dreamModel) {
        console.error("postModel undefined");
        return;
      }

      createIndexFile({
        modelId: dreamModel.streams[dreamModel.streams.length - 1].modelId,
        fileName: "create file test",
        fileContent: {
          ...formData,
          modelVersion: dreamVersion,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    },
    [dreamModel, createIndexFile]
  );

  return (
    <>
      <form onSubmit={createDream}>
        <input
          type="text"
          placeholder="text"
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        />
        <input
          type="text"
          placeholder="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <input
          type="checkbox"
          checked={formData.public}
          onChange={(e) =>
            setFormData({ ...formData, public: e.target.checked })
          }
        />
        <button type="submit">submit</button>
      </form>
      <div>{JSON.stringify(createdIndexFile)}</div>
    </>
  );
};

export default Create;
