"use client";
import { useQuizContext } from "@/lib/globalContext";
import { Quiz } from "@/components/Quiz";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QuizPage() {
  const { complete } = useQuizContext();
  const router = useRouter();

  useEffect(() => {
    complete && router.push("/assessment");
  }, [complete]);
  return (
    <div className="min-h-screen p-2 md:p-24 flex justify-center">
      <div className="w-full text-white flex flex-col items-center pt-40 md:pt-10">
        <div
          className={`${
            !complete ? "w-full md:w-[500px]" : "w-full"
          } rounded-t-xl bg-white text-black text-center mb-4 p-2 font-bold text-5xl`}
        >
          Quiz Me!
        </div>
        <Quiz />
      </div>
    </div>
  );
}
