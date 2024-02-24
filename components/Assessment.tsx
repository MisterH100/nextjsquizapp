import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IQuiz } from "@/lib/globalContext";
import Link from "next/link";

interface IAssesmentProps {
  currCorrectQuizzes: IQuiz[];
  currIncorrectQuizzes: IQuiz[];
  correctQuizzes: IQuiz[];
  incorrectQuizzes: IQuiz[];
  points: number;
}
export const Assessment = (props: IAssesmentProps) => {
  return (
    <div className="w-full text-black">
      <div className="flex gap-4 flex-col items-center md:flex-row">
        <Card className="border-none bg-white p-4 w-full md:w-1/2 min-h-[150px]">
          <CardHeader>
            <CardTitle className="">Correct</CardTitle>
            <CardDescription>
              {props.currCorrectQuizzes.length > 0
                ? props.currCorrectQuizzes.length
                : props.correctQuizzes.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {props.currCorrectQuizzes.length > 0 ? (
              <ScrollArea className="h-48 rounded-md border">
                {props.currCorrectQuizzes.map((correctQ, index) => (
                  <div
                    key={index}
                    className="w-full border border-gray-600 p-2 mb-2 text-base font-normal"
                  >
                    <div>
                      <p>Q: {correctQ?.question}</p>
                      <p className="text-blue-800">
                        A: {correctQ?.correctAnswer}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            ) : null}
          </CardContent>
          {props.currCorrectQuizzes.length == 0 && (
            <CardFooter className="pt-0 text-red-500">
              •excluding bonus quiz
            </CardFooter>
          )}
        </Card>
        <Card className="border-none bg-white p-4 w-full md:w-1/2 min-h-[150px]">
          <CardHeader>
            <CardTitle>Incorrect</CardTitle>
            <CardDescription>
              {props.currIncorrectQuizzes.length > 0
                ? props.currIncorrectQuizzes.length
                : props.incorrectQuizzes.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {props.currIncorrectQuizzes.length > 0 ? (
              <ScrollArea className="h-48 rounded-md border">
                {props.currIncorrectQuizzes.map((incorrectQ, index) => (
                  <div
                    key={index}
                    className="w-full border border-gray-600 p-2 mb-2 text-base font-normal"
                  >
                    <div>
                      <p>Q: {incorrectQ.question}</p>
                      <div className="flex justify-between">
                        <p className="text-blue-800">
                          A: {incorrectQ?.correctAnswer}
                        </p>
                        <p className="text-red-600">{incorrectQ?.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            ) : null}
          </CardContent>
          {props.currIncorrectQuizzes.length == 0 && (
            <CardFooter className="pt-0 text-red-500">
              •excluding bonus quiz
            </CardFooter>
          )}
        </Card>
      </div>
      {props.currCorrectQuizzes.length != 0 ? (
        <div className="w-full bg-blue-800 p-2 mt-4 text-white font-bold text-5xl text-center rounded-b-xl">
          <p>Points: {props.points}</p>
        </div>
      ) : (
        <div className="w-full bg-white p-10 mt-4 font-bold text-5xl text-center rounded-b-xl"></div>
      )}
      <div className="w-full flex justify-center gap-10 mt-10 h-10">
        <Link
          href={"/"}
          className="bg-white text-black w-[200px] rounded text-center text-xl flex justify-center items-center"
        >
          Home
        </Link>
      </div>
    </div>
  );
};
