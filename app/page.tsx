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
import pointsIcon from "@/public/points.svg";
import correctIcon from "@/public/correct.svg";
import incorrectIcon from "@/public/incorrect.svg";
import rankingIcon from "@/public/ranking.svg";
import { Separator } from "@/components/ui/separator";
import { Modal } from "@/components/Modal";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import { Leaderboard } from "@/components/Leaderboard";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const { showLeaderboard, setShowLeaderboard } = useQuizContext();
  const {
    player,
    setTimed,
    points,
    rank,
    correctQuizzes,
    inCorrectQuizzes,
    updateStats,
    currPlayer,
    getUsername,
    loading,
  } = useQuizContext();
  const router = useRouter();
  useEffect(() => {
    updateStats();
  }, []);
  useEffect(() => {
    getUsername(setUsername);
  }, [player.token]);

  return (
    <main className="min-h-screen">
      {showLeaderboard && <Leaderboard />}
      {!username ? (
        loading ? (
          <Loading />
        ) : (
          <Modal />
        )
      ) : loading ? (
        <Loading />
      ) : null}
      {points > 0 ||
      correctQuizzes.length > 0 ||
      inCorrectQuizzes.length > 0 ? (
        <div className="flex justify-center pt-40">
          <Card className="w-full sm:w-[500px] md:w-[850px] bg-white border-none mb-10 mx-auto rounded-t-xl">
            <CardHeader>
              <CardTitle className="text-xl truncate">{username}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg truncate font-normal">
                Stats
              </CardTitle>
              <Separator className="bg-gray-500" />
              <div className="py-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-between items-center text-bold text-lg gap-2 pt-2">
                    <Image
                      src={pointsIcon}
                      alt="points-icon"
                      className="w-4 h-4"
                      width={14}
                      height={14}
                      priority
                    />{" "}
                    Points: <span className="font-bold">{points}</span>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 bg-blue-800 rounded text-white hover:bg-blue-800"
                      onClick={() => setShowLeaderboard(!showLeaderboard)}
                    >
                      <Image
                        src={rankingIcon}
                        alt="ranking-icon"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                        priority
                      />
                      Rank: <span className="font-medium">{rank}</span>
                    </Button>
                  </div>
                </div>
                <div className="w-full flex justify-between flex-col md:flex-row">
                  <div className="flex items-center font-normal text-sm gap-2 pt-2">
                    <Image
                      src={correctIcon}
                      alt="correct-icon"
                      className="w-3 h-3"
                      width={12}
                      height={12}
                      priority
                    />
                    Correct quizzes:{" "}
                    <span className="font-normal">{correctQuizzes.length}</span>
                  </div>
                  <div className="flex items-center font-normal text-sm gap-2 pt-2">
                    <Image
                      src={incorrectIcon}
                      alt="correct-icon"
                      className="w-3 h-3"
                      width={12}
                      height={12}
                      priority
                    />{" "}
                    Incorrect Quizzes:{" "}
                    <span className="font-normal">
                      {inCorrectQuizzes.length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center pt-40">
          <Card className="w-full md:w-[850px] bg-white border-none mb-10 rounded-t-xl">
            <CardHeader>
              <CardDescription>
                Welcome
                <span className="font-bold pl-2">{username}</span>
              </CardDescription>
              <CardTitle className="text-black text-center p-2 font-bold text-5xl">
                Quiz Me!
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}
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
                router.push("/quiz");
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
              Play with 5 seconds on the clock, quizzes will be automatically
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
                router.push("/quiz");
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
