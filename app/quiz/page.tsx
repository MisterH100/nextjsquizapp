"use client";
import { useQuizContext } from "@/lib/globalContext";
import { Quiz } from "@/components/Quiz";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Loading } from "@/components/Loading";
import { ErrorModal } from "@/components/Error";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QuizPage() {
  const { complete, setLoadingMessage } = useQuizContext();
  const router = useRouter();
  useEffect(() => {
    complete && router.push("/assessment");
  }, [complete]);

  const quizData = useQuery({
    queryKey: ["generalQuizzes"],
    queryFn: async () => {
      setLoadingMessage("Loading quizzes...");
      const data: any = await axios.get(
        "https://misterh-api-server.onrender.com/api/general_quizzes"
      );
      return data;
    },
  });

  if (quizData.isLoading) {
    return <Loading />;
  }
  if (quizData.error) {
    return <ErrorModal />;
  }

  return (
    <div className="min-h-screen p-2 md:p-24 flex justify-center">
      <div className="w-full flex flex-col items-center pt-40 md:pt-10">
        <Card className="w-full md:w-[500px] bg-white border-none mb-10 mx-auto rounded-t-xl">
          <CardHeader>
            <CardTitle className="w-full text-center text-2xl">
              Quiz me!!
            </CardTitle>
          </CardHeader>
        </Card>
        <Quiz quizArray={quizData.data.data} />
      </div>
    </div>
  );
}
