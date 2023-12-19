import React from "react";
import coverImage from "@/assets/images/cover.webp";
import secondImage from "@/assets/images/cover-2.webp";
import thirdImage from "@/assets/images/cover-3.webp";
import {
  AlertOctagon,
  Box,
  BrainCircuit,
  ChevronRightSquare,
  FolderKey,
  Share,
} from "lucide-react";
import AccountButton from "@/components/AccountButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col space-y-24">
      <section className="grid grid-cols-1 place-items-center md:container md:grid-cols-2 lg:grid-cols-3">
        <div className="order-2 md:order-1 md:col-span-1 lg:col-span-2">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Record your dreams effortlessly with Lucid's intuitive interface.
          </h2>
          <small className="text-base text-slate-400">
            Lucid makes it easy to capture and document your dreams as soon as
            you wake up, ensuring you never forget a single detail.
          </small>
        </div>
        <img
          src={coverImage}
          alt="Lucid art"
          className="order-1 col-span-1 drop-shadow-[-5px_10px_15px_rgba(255,255,255,1)] md:order-2"
        />
      </section>
      <section className="-mx-5 bg-slate-900/75 px-5 py-10 md:py-20">
        <div className="grid gap-10 md:container md:grid-cols-2 lg:grid-cols-6">
          <div className="col-span-6 lg:col-span-3">
            <FolderKey className="mb-4 h-12 w-12 text-slate-300" />
            <h2 className="font-serif text-2xl font-bold leading-relaxed">
              Keep your dreams secure and private with Lucid's encrypted
              journal.
            </h2>
          </div>
          <div className="col-span-6 grid gap-12 md:grid-cols-3">
            <div className="col-span-1">
              <Share className="mb-4 h-6 w-6 text-slate-400" />
              <h3 className="mb-2 font-medium">Voluntary dream sharing</h3>
              <p className="text-sm font-light text-slate-300">
                With Lucid's intuitive user interface, control your privacy and
                share your dreams with the world only if you choose to.
              </p>
            </div>
            <div className="col-span-1">
              <Box className="mb-4 h-6 w-6 text-slate-400" />
              <h3 className="mb-2 font-medium">Powered by DataverseOS</h3>
              <p className="text-sm font-light text-slate-300">
                Lucid leverages the secure and decentralized DataverseOS
                blockchain network, ensuring your dream journaling experience is
                private, secure, and unalterable.
              </p>
            </div>
            <div className="col-span-1">
              <BrainCircuit className="mb-4 h-6 w-6 text-slate-400" />
              <h3 className="mb-2 font-medium">AI-assisted</h3>
              <p className="text-sm font-light text-slate-300">
                Unravel your dreams with AI interpretation. Get a glimpse into
                your subconscious with automatically generated visual previews.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-9 space-y-10 md:container md:space-x-10 md:space-y-0 lg:grid-cols-12 lg:items-center lg:space-x-20">
        <img
          src={secondImage}
          alt="lucid"
          className="col-span-4 rounded-full drop-shadow-[5px_10px_15px_rgba(255,255,255,1)] md:col-span-2 lg:col-span-3 lg:col-start-2"
        />
        <div className="col-span-9 col-start-1 flex flex-col gap-5 md:col-span-7 lg:col-span-7 lg:col-start-auto">
          <h2 className="font-serif text-2xl font-bold">
            Discover the power of dream journaling
          </h2>
          <p className="font-light leading-relaxed">
            Keeping a dream journal can have numerous benefits. It improves
            memory, enhances dream recall, and provides insights into your
            subconscious mind. By documenting your dreams, you can track
            personal growth and gain a better understanding of your inner
            thoughts and emotions.
          </p>
          <ul className="flex flex-col items-start gap-3">
            <li className="flex items-center gap-2 text-sm capitalize">
              <ChevronRightSquare className="mr-2 h-4 w-4 text-slate-400" />
              Improve memory and dream recall
            </li>
            <li className="flex items-center gap-2 text-sm capitalize">
              <ChevronRightSquare className="mr-2 h-4 w-4 text-slate-400" />
              Gain insight into your subconscious mind
            </li>
            <li className="flex items-center gap-2 text-sm capitalize">
              <ChevronRightSquare className="mr-2 h-4 w-4 text-slate-400" />
              Track personal growth and inner reflection
            </li>
          </ul>
        </div>
      </section>
      <section className="grid grid-cols-9 space-y-10 md:container md:space-x-10 md:space-y-0 lg:grid-cols-12 lg:items-center lg:space-x-20">
        <img
          src={thirdImage}
          alt="lucid"
          className="col-span-4 rounded-full drop-shadow-[-5px_10px_15px_rgba(255,255,255,1)] md:col-span-2 lg:order-2 lg:col-span-3 lg:col-start-auto"
        />
        <div className="col-span-9 col-start-1 flex flex-col gap-5 md:col-span-7 lg:order-1 lg:col-span-8 lg:col-start-1">
          <h2 className="font-serif text-2xl font-bold">
            Start journaling your dreams today
          </h2>
          <p className="font-light leading-relaxed lg:pr-20">
            Lucid is the perfect tool to record and analyze your dreams, helping
            you gain insights and self-awareness.
          </p>
          <div className="flex space-x-5">
            <AccountButton />
          </div>
        </div>
      </section>
      <section className="mb-24 md:container">
        <div className="rounded-xl bg-slate-900 p-5 md:p-10">
          <h2 className="mb-3 flex items-center gap-2 text-slate-400">
            <AlertOctagon className="h-4 w-4" />
            Disclaimer:
          </h2>
          <p className="text-sm leading-loose">
            This project was developed as a submission for the{" "}
            <Link
              className="underline"
              to="https://dorahacks.io/hackathon/rebuild-ownership-2/detail"
            >
              Rebuild Ownership 2.0
            </Link>{" "}
            Hackathon and is not intended for production use without further
            development and rigorous testing. The code and functionalities
            presented in this repository were created within a limited time
            frame specifically for the hackathon. As such, it may contain bugs,
            incomplete features, or security vulnerabilities.
            <br />
            <b>Caution is advised</b> when using this codebase in a production
            environment or as a basis for a fully deployed application. It's
            recommended to review, enhance, and test the code thoroughly before
            considering it for any production-level implementation. We
            appreciate your interest in this project and welcome contributions,
            feedback, or suggestions for improvements. Please proceed with
            caution and understanding of its hackathon-oriented context.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
