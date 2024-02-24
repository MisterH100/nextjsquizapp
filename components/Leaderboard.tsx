"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useQuizContext } from "@/lib/globalContext";
import { useRouter } from "next/navigation";

interface ILeaderboard {
  username: string;
  points: number;
}
interface ILeaderboardProps {
  leaderboardArray: ILeaderboard[];
}
export const Leaderboard = (props: ILeaderboardProps) => {
  const router = useRouter();
  const { rank } = useQuizContext();
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

  useEffect(() => {
    setDate(new Date(Date.now()).getDate());
    setMonth(new Date(Date.now()).getMonth());
  }, []);
  return (
    <div className="w-full h-screen bg-white pt-40 overflow-y-auto">
      <div className="flex items-center justify-between px-4 pb-4">
        <h1 className="text-2xl">Leader board</h1>
        <Button variant={"outline"} onClick={() => router.push("/")}>
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
          {props.leaderboardArray.map((player, index) => (
            <TableRow key={index}>
              <TableCell>
                {index + 1}. {player.username} {rank == index + 1 && "(you)"}
              </TableCell>
              <TableCell className="text-right">{player.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
