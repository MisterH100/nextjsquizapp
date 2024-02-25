"use client";
import { useQuizContext } from "@/lib/globalContext";
import { StatsBanner } from "@/components/StatsBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { ErrorModal } from "@/components/Error";
import { PlayCards } from "@/components/PlayCards";
import { Modal } from "@/components/CreatePlayer";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";

export default function Home() {
  const {
    username,
    player,
    rank,
    points,
    correctQuizzes,
    incorrectQuizzes,
    setRank,
    setComplete,
    setCorrectQuizzes,
    setIncorrectQuizzes,
    setPoints,
    setUsername,
    authPlayer,
    setLoadingMessage,
  } = useQuizContext();
  const [usernameModal, setUsernameModal] = useState(false);
  const playerStats = useQuery({
    queryKey: ["playerStats", username],
    queryFn: async () => {
      setLoadingMessage("Loading player stats...");
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
        });

      return data;
    },
    enabled: !!username,
  });

  useEffect(() => {
    if (!username) {
      setUsernameModal(true);
      authPlayer();
    } else {
      setUsernameModal(false);
    }
  }, [username]);

  if (playerStats.isLoading) {
    return <Loading />;
  }
  if (playerStats.error) {
    return <ErrorModal />;
  }

  return (
    <div>
      <Header />
      {usernameModal && <Modal />}
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
