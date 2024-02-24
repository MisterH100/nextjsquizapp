import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IAnswers, IQuiz, useQuizContext } from "@/lib/globalContext";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface IQuizProps {
  quizArray: IQuiz[];
}
export const Quiz = (props: IQuizProps) => {
  const router = useRouter();
  const {
    timed,
    currCorrectQuizzes,
    currIncorrectQuizzes,
    setTimed,
    setPoints,
    setCurrCorrectQuizzes,
    setCurrIncorrectQuizzes,
    updateData,
  } = useQuizContext();
  const [currQuiz, setCurrQuiz] = useState(0);
  const [progress, setProgress] = useState(100);
  const [done, setDone] = useState(false);
  const choices = ["A", "B", "C"];

  useEffect(() => {
    if (timed) {
      if (progress < 1 || progress == 0) {
        nextQuiz();
      }
      const timer = setTimeout(() => {
        setProgress((prev) => prev - 10);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const compareAns = (quiz: IQuiz, ans: string) => {
    if (quiz.correctAnswer == ans) {
      setCurrCorrectQuizzes([
        ...currCorrectQuizzes,
        { ...quiz, answered: true },
      ]);
      setPoints((prev) => prev + quiz.points);
      setProgress(100);
    } else {
      setCurrIncorrectQuizzes([
        ...currIncorrectQuizzes,
        { ...quiz, answered: true, answer: ans },
      ]);
      setProgress(100);
    }
  };
  const nextQuiz = () => {
    if (props.quizArray) {
      if (currQuiz >= props.quizArray.length - 1) {
        setDone(!done);
        setCurrQuiz(0);
        setProgress(100);
        setTimed(false);
        router.push("/assessment");
        updateData();
      } else {
        setCurrQuiz((prev) => prev + 1);
        setProgress(100);
      }
    }
  };

  return (
    <Card className="border-none w-full md:w-[500px] overflow-hidden">
      {timed && (
        <CardHeader className="bg-white">
          <Progress value={progress} className="w-full border border-white" />
        </CardHeader>
      )}
      <CardContent className="p-0">
        {done ? (
          <Card className="text-white flex flex-col items-center border-none w-full md:w-[500px] overflow-hidden">
            <CardHeader>
              <CardTitle>Done!</CardTitle>
            </CardHeader>
            <CardContent>You have completed today's quizzes</CardContent>
          </Card>
        ) : (
          <form
            id={props.quizArray[currQuiz].question}
            className="w-full p-4 text-black bg-white"
          >
            <h1 className="text-lg">Q: {props.quizArray[currQuiz].question}</h1>
            <ul className="p-4 flex flex-col gap-4">
              {props.quizArray[currQuiz].answers?.map(
                (ans: IAnswers, index: number) => (
                  <li key={index} className="w-full cursor-pointer">
                    <div>
                      <button
                        className="text-left w-full border border-blue-800 p-2  active:bg-blue-800 active:text-white rounded"
                        value={ans.name}
                        onClick={(e) => {
                          e.preventDefault();
                          compareAns(props.quizArray[currQuiz], ans.name);
                          nextQuiz();
                        }}
                      >
                        {choices[index]}: {ans.name}
                      </button>
                    </div>
                  </li>
                )
              )}
            </ul>
          </form>
        )}
      </CardContent>
      <CardFooter className="mt-4 p-0">
        {!done && (
          <Button
            className="w-full h-20 bg-white hover:text-white hover:bg-red-600 text-xl text-black rounded-b-xl"
            variant={"destructive"}
            onClick={() => {
              setCurrQuiz(0);
              setCurrCorrectQuizzes([]);
              setCurrIncorrectQuizzes([]);
              setTimed(false);
              router.push("/");
            }}
          >
            Give up
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
