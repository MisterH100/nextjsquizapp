"use client";
import { useQuizContext } from "@/lib/globalContext";
import { Quiz } from "@/components/Quiz";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Loading } from "@/components/Loading";
import { ErrorModal } from "@/components/Error";

export default function QuizPage() {
  const { complete } = useQuizContext();
  const router = useRouter();
  useEffect(() => {
    complete && router.push("/assessment");
  }, [complete]);

  const quizData = useQuery({
    queryKey: ["generalQuizzes"],
    queryFn: async () => {
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
      <div className="w-full text-white flex flex-col items-center pt-40 md:pt-10">
        <Quiz quizArray={quizData.data.data} />
      </div>
    </div>
  );
}
