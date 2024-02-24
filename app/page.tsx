"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuizContext } from "@/lib/globalContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import stopWatch from "@/public/stopwatch.svg";
import calmFace from "@/public/calmface.svg";
import { Modal } from "@/components/CreatePlayer";
import { Leaderboard } from "@/components/Leaderboard";
import { StatsBanner } from "@/components/StatsBanner";
import { useEffect } from "react";

export default function Home() {
  const { setTimed, complete, username, showLeaderboard, loading, authPlayer } =
    useQuizContext();
  const router = useRouter();
  useEffect(() => {
    authPlayer();
  }, []);
  return (
    <main className="min-h-screen">
      {showLeaderboard && <Leaderboard />}
      {!username && !loading && <Modal />}
      <StatsBanner />
      <div className="flex justify-center gap-10 flex-wrap pb-10">
        <Card className="w-full md:w-[400px] bg-blue-800 border-none">
          <CardHeader className="text-white">
            <CardTitle>Play Normal</CardTitle>
            <CardDescription>
              Play with infinite time to think and research if you want
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex items-center flex-col gap-10">
            <div>
              <Image
                src={calmFace}
                alt="calm-face"
                width={200}
                height={200}
                priority
              />
            </div>
            <Button
              className="w-[200px] bg-white hover:text-white border-white"
              variant={"outline"}
              onClick={() => {
                if (!complete) {
                  router.push("/quiz");
                } else {
                  router.push("/assessment");
                }
              }}
            >
              Play
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[400px] bg-red-600 border-none">
          <CardHeader className="text-white">
            <CardTitle>Play Timed</CardTitle>
            <CardDescription>
              Play with 10 seconds on the clock, quizzes will be automatically
              skipped when time runs out
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex items-center flex-col gap-10">
            <div>
              <Image
                src={stopWatch}
                alt="stop-watch"
                width={200}
                height={200}
                priority
              />
            </div>
            <Button
              className="w-[200px] bg-white hover:text-white border-white"
              variant={"outline"}
              onClick={() => {
                setTimed(true);
                if (!complete) {
                  router.push("/quiz");
                } else {
                  router.push("/assessment");
                }
              }}
            >
              Play
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
