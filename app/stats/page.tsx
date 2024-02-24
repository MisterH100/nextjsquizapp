"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProfileCard } from "@/components/Profile";
import { useQuizContext } from "@/lib/globalContext";
import { Loading } from "@/components/Loading";
import { ErrorModal } from "@/components/Error";

export default function StatsPage() {
  const { player, rank, setRank, setLoadingMessage } = useQuizContext();

  const playerInfo = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      setLoadingMessage("Loading player info...");
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
        });
      return data;
    },
  });
  if (playerInfo.isLoading) {
    return <Loading />;
  }
  if (playerInfo.error) {
    return <ErrorModal />;
  }
  return (
    <div className="w-full min-h-screen flex justify-center">
      <ProfileCard
        username={playerInfo.data.data.details.username}
        points={playerInfo.data.data.details.points}
        correctQuizzes={playerInfo.data.data.details.correctQuizzes}
        incorrectQuizzes={playerInfo.data.data.details.incorrectQuizzes}
        rank={rank}
      />
    </div>
  );
}
