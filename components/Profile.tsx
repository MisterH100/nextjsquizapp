"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IQuiz, useQuizContext } from "@/lib/globalContext";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface IProfileProps {
  username: string;
  points: number;
  correctQuizzes: IQuiz[];
  incorrectQuizzes: IQuiz[];
  rank: number;
}
export const ProfileCard = (props: IProfileProps) => {
  const router = useRouter();
  const { player } = useQuizContext();
  const tokenRef = useRef<HTMLParagraphElement>(null);
  const [copied, setCopied] = useState(false);

  return (
    <Card className="bg-white my-10 w-full md:w-3/4">
      <CardHeader className="flex-row justify-between items-center">
        <span className="text-2xl">Profile</span>
        <Button variant={"outline"} onClick={() => router.push("/")}>
          close
        </Button>
      </CardHeader>
      <CardContent>
        <CardTitle>Info</CardTitle>

        <CardDescription className="pt-5">Username</CardDescription>
        <CardTitle className="font-medium text-lg">{props.username}</CardTitle>
        <CardDescription className="pt-5">Token</CardDescription>
        <div className="flex items-center">
          <CardTitle
            ref={tokenRef}
            className="w-full font-medium text-lg truncate"
          >
            {player.token}
          </CardTitle>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                tokenRef.current ? tokenRef.current.innerHTML : player.token
              );
              setCopied(true);
            }}
            className="text-white bg-blue-800 rounded hover:bg-blue-800"
          >
            {copied ? "copied" : "copy"}
          </Button>
        </div>
        <Separator className="bg-gray-500 my-5" />
        <CardTitle>Stats</CardTitle>
        <div className="grid grid-cols-2">
          <div>
            <CardDescription className="pt-5">Points</CardDescription>
            <CardTitle className="font-medium text-lg">
              {props.points}
            </CardTitle>
          </div>
          <div>
            <CardDescription className="pt-5 text-right">Rank</CardDescription>
            <CardTitle className="font-medium text-lg text-right">
              {props.rank}
            </CardTitle>
          </div>
          <div>
            <CardDescription className="pt-5">Medal</CardDescription>
            <CardTitle className="font-medium text-lg">
              {props.rank == 1 ? "Gold" : props.rank == 2 ? "Silver" : "none"}
            </CardTitle>
          </div>
        </div>
        <Separator className="bg-gray-500 my-5" />
        <div className="grid grid-cols-2">
          <div>
            <CardDescription className="pt-5">Correct quizzes</CardDescription>
            <CardTitle className="font-medium text-lg">
              {props.correctQuizzes.length}
            </CardTitle>
          </div>
          <div>
            <CardDescription className="pt-5 text-right">
              Incorrect quizzes
            </CardDescription>
            <CardTitle className="font-medium text-lg text-right">
              {props.incorrectQuizzes.length}
            </CardTitle>
          </div>
          <div>
            <CardDescription className="pt-5">
              Total quizzes answered
            </CardDescription>
            <CardTitle className="font-medium text-lg">
              {props.correctQuizzes.length + props.incorrectQuizzes.length}
            </CardTitle>
          </div>
        </div>
        <CardFooter className="pt-10">
          <p>
            *this token is stored in your local storage and it is your
            authentication key. It helps you seamlessly log in, especially if
            you switch browsers. Feel free to copy it for a hassle-free
            experience!
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
