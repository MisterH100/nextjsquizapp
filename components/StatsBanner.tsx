"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IQuiz } from "@/lib/globalContext";
import Image from "next/image";
import pointsIcon from "@/public/points.svg";
import correctIcon from "@/public/correct.svg";
import incorrectIcon from "@/public/incorrect.svg";
import rankingIcon from "@/public/ranking.svg";
import goldMedal from "@/public/gold_medal.svg";
import silverMedal from "@/public/silver_medal.svg";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IBannerProps {
  username: string;
  points: number;
  correctQuizzes: IQuiz[];
  incorrectQuizzes: IQuiz[];
  rank: number;
}
export const StatsBanner = (props: IBannerProps) => {
  const router = useRouter();
  const totalQuizzes =
    props.correctQuizzes.length + props.incorrectQuizzes.length;
  return (
    <div className="flex justify-center pt-40">
      <Card className="w-full sm:w-[500px] md:w-[850px] bg-white border-none mb-10 mx-auto rounded-t-xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <Link href="/stats">{props.username}</Link>
            {props.rank == 1 && (
              <Image
                src={goldMedal}
                alt="gold-medal-icon"
                className="w-10 h-10"
                width={40}
                height={40}
                priority
              />
            )}
            {props.rank == 2 && (
              <Image
                src={silverMedal}
                alt="gold-medal-icon"
                className="w-10 h-10"
                width={40}
                height={40}
                priority
              />
            )}
          </CardTitle>
        </CardHeader>
        {props.points != 0 && totalQuizzes != 0 ? (
          <>
            <CardContent className="p-0"></CardContent>
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
                    />
                    Points: <span className="font-bold">{props.points}</span>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 bg-blue-800 rounded text-white hover:bg-blue-800"
                      onClick={() => router.push("/leaderboard")}
                    >
                      <Image
                        src={rankingIcon}
                        alt="ranking-icon"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                        priority
                      />
                      Rank: <span className="font-medium">{props.rank}</span>
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
                    Correct quizzes:
                    <span className="font-normal">
                      {props.correctQuizzes.length}
                    </span>
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
                    Incorrect Quizzes:
                    <span className="font-normal">
                      {props.incorrectQuizzes.length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardHeader>
            <CardTitle className="w-full text-center text-2xl">
              Quiz me!!
            </CardTitle>
          </CardHeader>
        )}
      </Card>
    </div>
  );
};
