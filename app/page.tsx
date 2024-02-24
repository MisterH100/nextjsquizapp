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
import { StatsBanner } from "@/components/StatsBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { ErrorModal } from "@/components/Error";
import { PlayCards } from "@/components/PlayCards";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const {
    username,
    player,
    rank,
    complete,
    points,
    correctQuizzes,
    incorrectQuizzes,
    setRank,
    setComplete,
    setCorrectQuizzes,
    setIncorrectQuizzes,
    setPoints,
    setUsername,
    setLoadingMessage,
    setLoading,
    authPlayer,
  } = useQuizContext();
  const playerToken = player.token;

  const playerStats = useQuery({
    queryKey: ["playerStats", playerToken],
    queryFn: async () => {
      setLoadingMessage("Updating player stats...");
      setLoading(true);
      const data: any = await axios.post(
        `https://misterh-api-server.onrender.com/api/quiz_player/auth`,
        { username: null },
        {
          headers: {
            "quiz-token": player.token,
          },
        }
      );
      setPoints(data.data.details.points);
      setCorrectQuizzes(data.data.details.correctQuizzes);
      setIncorrectQuizzes(data.data.details.incorrectQuizzes);
      setComplete(data.data.details.completed);
      setUsername(data.data.details.username);
      axios
        .get(
          `https://misterh-api-server.onrender.com/api/quiz_player/rank/${data.data.details._id}`
        )
        .then((response: any) => {
          setRank(response.data.rank);
          setLoading(false);
        });

      return data;
    },
    enabled: !!playerToken,
  });

  if (playerStats.isLoading) {
    return <Loading />;
  }
  if (playerStats.error) {
    return <ErrorModal />;
  }

  useEffect(() => {
    authPlayer();
  }, []);
  return (
    <div>
      {!username && <Modal />}
      <StatsBanner
        username={username}
        points={points}
        correctQuizzes={correctQuizzes}
        incorrectQuizzes={incorrectQuizzes}
        rank={rank}
      />
      <PlayCards />
    </div>
  );
}
