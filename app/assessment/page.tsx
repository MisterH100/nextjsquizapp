"use client";
import { Assessment } from "@/components/Assessment";
import { useQuizContext } from "@/lib/globalContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AssessmentPage() {
  const {
    currCorrectQuizzes,
    currIncorrectQuizzes,
    correctQuizzes,
    incorrectQuizzes,
    points,
  } = useQuizContext();

  return (
    <div className="min-h-screen p-2 md:px-24 pt-40">
      <Card className="w-full bg-white border-none mb-10 mx-auto rounded-t-xl">
        <CardHeader>
          <CardTitle className="w-full text-center text-2xl">
            Quiz me!!
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="w-full text-white flex flex-col items-center">
        <Assessment
          correctQuizzes={correctQuizzes}
          currCorrectQuizzes={currCorrectQuizzes}
          incorrectQuizzes={incorrectQuizzes}
          currIncorrectQuizzes={currIncorrectQuizzes}
          points={points}
        />
      </div>
    </div>
  );
}
