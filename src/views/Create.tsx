import React, { useCallback, useEffect, useState } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import app from "../../output/app.json";
import { useCreateIndexFile, useStore } from "@dataverse/hooks";
import {
  DreamFormData,
  GeneratedImageResponse,
  GeneratedTextResponse,
} from "../utils/types";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader,
  Loader2,
  PenLine,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import interpretDream from "@/utils/interpretDream";
import generateDreamImage from "@/utils/generateDreamImage";
import { uploadToIPFS } from "@/utils/uploadToIPFS";

const modelParser = new ModelParser(app as Output);
const formSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Dream description is required" })
    .max(280, { message: "Dream description can`t exceed 1024 characters." }),
  public: z.boolean(),
  date: z.date({
    required_error: "Date of dream is required",
  }),
  emotion: z.string().min(1, { message: "Emotion is required" }),
});

export const emotions = [
  {
    value: "Happiness",
    label: "Joyful, delighted, content, cheerful",
  },
  {
    value: "Sadness",
    label: "Sorrowful, melancholic, upset, gloomy",
  },
  {
    value: "Fear",
    label: "Anxious, terrified, panicked, uneasy",
  },
  {
    value: "Anger",
    label: "Irritated, enraged, frustrated, furious",
  },
  {
    value: "Surprise",
    label: "Astonished, amazed, stunned, startled",
  },
  {
    value: "Disgust",
    label: "Revolted, repulsed, distaste, aversion",
  },
  {
    value: "Love",
    label: "Affectionate, adoring, caring, passionate",
  },
  {
    value: "Confusion",
    label: "Perplexed, bewildered, disoriented, puzzled",
  },
  {
    value: "Excitement",
    label: "Eager, thrilled, enthusiastic, exhilarated",
  },
  {
    value: "Peacefulness",
    label: "Calm, serene, tranquil, relaxed",
  },
];

const Create = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      public: false,
      date: undefined,
      emotion: undefined,
    },
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [currentFileId, setCurrentFileId] = useState<string>();
  const [dreamStatus, setDreamStatus] = useState(
    form.getValues().public ? "Public" : "Private"
  );

  const dreamVersion = import.meta.env.VITE_DREAM_VERSION;
  const dreamModel = modelParser.getModelByName("dream");
  const { pkh } = useStore();

  const { createdIndexFile, createIndexFile } = useCreateIndexFile({
    onSuccess: (result) => {
      console.log("[createFile]create file success:", result);
      //   setCurrentFileId(result.fileContent.file.fileId);
      navigate(`/dream/${result.fileContent.file.fileId}`);
    },
    onError(error) {
      console.error("[createFile]create file failed:", error);
    },
    onPending(args) {
      console.log("[createFile]create file pending:", args);
    },
  });

  const createDream = useCallback(
    async (
      e: React.FormEvent,
      id: string,
      formData: {
        text: string;
        public: boolean;
        date: Date;
        emotion: string;
        interpretation: string;
        image: string;
      }
    ) => {
      e.preventDefault();
      if (!dreamModel) {
        console.error("postModel undefined");
        return;
      }

      await createIndexFile({
        modelId: dreamModel.streams[dreamModel.streams.length - 1].modelId,
        fileName: id,
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

  const submitHandler = async (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent
  ) => {
    try {
      setLoading(true);
      setLoadingMessage("Preparing to submit your dream...");
      // ----- INTERPRET DREAM -----
      setLoadingMessage("Interpreting your dream using AI...");
      const interpretedDream: GeneratedTextResponse = await interpretDream(
        values.text
      );
      // ----- GENERATE DREAM IMAGE -----
      setLoadingMessage("Illustrating your dream using AI...");
      const generatedImage: GeneratedImageResponse = await generateDreamImage(
        ` turn this dream into an digital illustration with the ${values.emotion} emotion: ${values.text}`
      );
      // ----- UPLOAD IMAGE TO IPFS -----
      setLoadingMessage("Uploading image to IPFS...");
      const ipfs = await uploadToIPFS(generatedImage.data[0].b64_json);
      const ipfsAddress = `https://ipfs.io/ipfs/${ipfs}`;
      //I was walking my dog in the park while eating an ice cream and enjoying the scenery.
      // ----- CREATE DREAM -----
      setLoadingMessage("Submitting your dream...");
      const dreamId = interpretedDream.id;
      const dreamData = {
        text: values.text,
        public: values.public,
        date: values.date,
        emotion: values.emotion,
        interpretation: interpretedDream.choices[0].message.content,
        image: ipfsAddress,
      };
      await createDream(e, dreamId, dreamData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container relative lg:-my-5 lg:max-w-[600px] lg:border-x lg:py-5">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
          <Alert className="w-2/3 drop-shadow-2xl">
            <Loader className="h-4 w-4 animate-spin-slow" />
            <AlertTitle>Please wait</AlertTitle>
            <AlertDescription className="mt-1 text-slate-400">
              {loadingMessage}
            </AlertDescription>
          </Alert>
        </div>
      )}
      <h2 className="mb-5 flex items-center text-xl font-bold">
        <PenLine className="mr-2 h-5 w-5 text-slate-400" />
        Create dream entry
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className={`space-y-5 ${loading && "pointer-events-none"}`}
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dream description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your dream as much as you can remember..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Craft a comprehensive narrative that paints a detailed
                  picture, allowing you to revisit and explore the rich layers
                  of your subconscious experiences.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name="public"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dream status</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <Switch
                      {...field}
                      id="public-switch"
                      onCheckedChange={() =>
                        setDreamStatus(
                          dreamStatus === "Public" ? "Private" : "Public"
                        )
                      }
                      defaultChecked={form.getValues().public}
                    />
                    <Label htmlFor="public-switch" className="cursor-pointer">
                      {dreamStatus}
                    </Label>
                  </div>
                </FormControl>
                <FormDescription>
                  {dreamStatus === "Public"
                    ? "Share this dream entry with the community. Others can view and potentially find connections or similarities with their own dreams."
                    : "Keep this dream entry personal and private. Your dream will remain confidential and accessible only to you."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Dream</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        toDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Select the specific date on which you had this dream to
                  accurately timestamp your dream entry and organize your dream
                  log chronologically.
                </FormDescription>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name="emotion"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Emotion</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? field.value : "Select an emotion"}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandGroup>
                        {emotions.map((emotion) => (
                          <CommandItem
                            value={emotion.value}
                            key={emotion.value}
                            onSelect={() =>
                              form.setValue("emotion", emotion.value)
                            }
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                emotion.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col gap-1">
                              <strong>{emotion.value}</strong>
                              <small className="text-xs text-slate-400">
                                {emotion.label}
                              </small>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
                <FormDescription>
                  Select the emotion that best represents your feelings during
                  or after the dream to vividly capture the emotional landscape
                  of your dream experience.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Submit Dream
          </Button>
        </form>
      </Form>
      <div>{JSON.stringify(createdIndexFile)}</div>
    </section>
  );
};

export default Create;
