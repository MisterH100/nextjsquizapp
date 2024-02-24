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
import { useQuizContext } from "@/lib/globalContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "./Loading";
import { ErrorModal } from "./Error";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const ProfileCard = () => {
  const {
    player,
    setErrorMessage,
    errorMessage,
    setLoadingMessage,
    setLoading,
    loading,
    setRank,
    rank,
  } = useQuizContext();
  const tokenRef = useRef<HTMLParagraphElement>(null);
  const [copied, setCopied] = useState(false);
  const playerInfo = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      setLoadingMessage("Fetching player info...");
      const data: any = await axios.post(
        `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
        { username: null },
        {
          headers: {
            "quiz-token": player.token,
          },
        }
      );
      axios
        .get(
          `https://misterh-api-server.onrender.com/api/quiz_player/rank/${data.data.details._id}`
        )
        .then((response) => {
          setRank(response.data.rank);
          setLoading(false);
        });

      return data;
    },
  });

  return (
    <Card className="bg-white mt-40 w-full md:w-3/4">
      {playerInfo.isLoading && <Loading />}
      {errorMessage && <ErrorModal />}
      <CardHeader className="flex-row justify-between items-center">
        Profile <Link href="/">back</Link>
      </CardHeader>
      {playerInfo.data ? (
        <CardContent>
          <CardTitle>Info</CardTitle>
          <CardDescription className="pt-5">Username</CardDescription>
          <CardTitle className="font-medium text-lg">
            {playerInfo?.data?.data.details.username}
          </CardTitle>
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
          <div className="flex justify-between items-center">
            <div>
              <CardDescription className="pt-5">Points</CardDescription>
              <CardTitle className="font-medium text-lg">
                {playerInfo?.data?.data.details.points}
              </CardTitle>
            </div>
            <div>
              <CardDescription className="pt-5">Rank</CardDescription>
              <CardTitle className="font-medium text-lg text-right">
                {rank}
              </CardTitle>
            </div>
          </div>
          <Separator className="bg-gray-500 my-5" />
          <div className="grid grid-cols-2">
            <div>
              <CardDescription className="pt-5">
                Correct quizzes
              </CardDescription>
              <CardTitle className="font-medium text-lg">
                {playerInfo?.data?.data.details.correctQuizzes.length}
              </CardTitle>
            </div>
            <div>
              <CardDescription className="pt-5 text-right">
                Incorrect quizzes
              </CardDescription>
              <CardTitle className="font-medium text-lg text-right">
                {playerInfo?.data?.data.details.incorrectQuizzes.length}
              </CardTitle>
            </div>
            <div>
              <CardDescription className="pt-5">
                Total quizzes answered
              </CardDescription>
              <CardTitle className="font-medium text-lg">
                {playerInfo?.data?.data.details.correctQuizzes.length +
                  playerInfo?.data?.data.details.incorrectQuizzes.length}
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
      ) : null}
    </Card>
  );
};
