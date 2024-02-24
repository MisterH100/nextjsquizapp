import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
interface ILeaderboard {
  username: string;
  points: number;
}
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useQuizContext } from "@/lib/globalContext";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { error } from "console";

export const Leaderboard = () => {
  const {
    showLeaderboard,
    setShowLeaderboard,
    setLoading,
    loading,
    setLoadingMessage,
    setErrorMessage,
    rank,
  } = useQuizContext();
  const [date, setDate] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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

  useEffect(() => {
    setDate(new Date(Date.now()).getDate());
    setMonth(new Date(Date.now()).getMonth());
  }, []);
  return (
    <div className="z-[100] fixed top-0 left-0 w-full h-screen flex justify-center  bg-black bg-opacity-20">
      {leaderBoardData.isLoading && <Loading />}
      <div className="w-full md:w-1/2 h-screen bg-white pt-10 overflow-y-auto">
        <div className="flex items-center justify-between px-4 pb-4">
          <h1 className="text-2xl">Leader board</h1>
          <Button
            variant={"outline"}
            onClick={() => setShowLeaderboard(!showLeaderboard)}
          >
            close
          </Button>
        </div>
        <Table className="bg-white h-fit">
          <TableCaption className="bg-white mt-0">
            Leader board as of
            <br /> {date} {months[month]} {new Date(Date.now()).getFullYear()}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">Player</TableHead>
              <TableHead className="min-w-[100px] text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderBoardData.isLoading
              ? null
              : leaderBoardData.data?.data.map(
                  (player: ILeaderboard, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        {index + 1}. {player.username}{" "}
                        {rank == index + 1 && "(you)"}
                      </TableCell>
                      <TableCell className="text-right">
                        {player.points}
                      </TableCell>
                    </TableRow>
                  )
                )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
