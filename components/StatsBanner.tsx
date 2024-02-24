import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuizContext } from "@/lib/globalContext";
import Image from "next/image";
import pointsIcon from "@/public/points.svg";
import correctIcon from "@/public/correct.svg";
import incorrectIcon from "@/public/incorrect.svg";
import rankingIcon from "@/public/ranking.svg";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import axios from "axios";
import { ErrorModal } from "./Error";
import { Loading } from "./Loading";

export const StatsBanner = () => {
  const {
    player,
    rank,
    setRank,
    username,
    showLeaderboard,
    setShowLeaderboard,
    setComplete,
    setCorrectQuizzes,
    setInCorrectQuizzes,
    setPoints,
    setUsername,
    setLoadingMessage,
    setLoading,
    points,
    correctQuizzes,
    inCorrectQuizzes,
    errorMessage,
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
      setInCorrectQuizzes(data.data.details.incorrectQuizzes);
      setComplete(data.data.details.completed);
      setUsername(data.data.details.username);
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
    enabled: !!playerToken,
  });

  return (
    <div className="flex justify-center pt-40">
      {errorMessage && <ErrorModal />}
      <Card className="w-full sm:w-[500px] md:w-[850px] bg-white border-none mb-10 mx-auto rounded-t-xl">
        <CardHeader>
          <CardTitle className="text-xl truncate">
            <Link href="/stats">{username}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {points != 0 ||
          correctQuizzes.length != 0 ||
          inCorrectQuizzes.length != 0 ? (
            <>
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
                      Rank:{" "}
                      <span className="font-medium">
                        {points == 0 ? null : rank}
                      </span>
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
            </>
          ) : (
            <CardTitle className="text-3xl w-full text-center">
              Quiz me!!
            </CardTitle>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
