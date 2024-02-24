"use client";
import axios from "axios";
import { Leaderboard } from "@/components/Leaderboard";
import { Loading } from "@/components/Loading";
import { ErrorModal } from "@/components/Error";
import { useQuery } from "@tanstack/react-query";
import { useQuizContext } from "@/lib/globalContext";

export default function LeaderboardPage() {
  const { setLoadingMessage } = useQuizContext();
  const leaderBoardData = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      setLoadingMessage("Updating leader board...");
      const data: any = await axios.get(
        "https://misterh-api-server.onrender.com/api/quiz_player/players/points"
      );
      return data;
    },
  });

  if (leaderBoardData.isLoading) {
    return <Loading />;
  }
  if (leaderBoardData.error) {
    return <ErrorModal />;
  }
  return (
    <div className="w-full min-h-screen flex justify-center">
      <Leaderboard leaderboardArray={leaderBoardData.data.data} />
    </div>
  );
}
