import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import stopWatch from "@/public/stopwatch.svg";
import calmFace from "@/public/calmface.svg";
import { useRouter } from "next/navigation";
import { useQuizContext } from "@/lib/globalContext";

export const PlayCards = () => {
  const router = useRouter();
  const { complete, setTimed } = useQuizContext();
  return (
    <div className="flex justify-center gap-10 flex-wrap pb-10">
      <Card className="w-full md:w-[400px] bg-blue-800 border-none">
        <CardHeader className="text-white">
          <CardTitle>Play Normal</CardTitle>
          <CardDescription>
            Play with infinite time to think and research if you want
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex items-center flex-col gap-10">
          <div>
            <Image
              src={calmFace}
              alt="calm-face"
              width={200}
              height={200}
              priority
            />
          </div>
          <Button
            className="w-[200px] bg-white hover:text-white border-white"
            variant={"outline"}
            onClick={() => {
              if (!complete) {
                router.push("/quiz");
              } else {
                router.push("/assessment");
              }
            }}
          >
            Play
          </Button>
        </CardContent>
      </Card>
      <Card className="w-full md:w-[400px] bg-red-600 border-none">
        <CardHeader className="text-white">
          <CardTitle>Play Timed</CardTitle>
          <CardDescription>
            Play with 10 seconds on the clock, quizzes will be automatically
            skipped when time runs out
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex items-center flex-col gap-10">
          <div>
            <Image
              src={stopWatch}
              alt="stop-watch"
              width={200}
              height={200}
              priority
            />
          </div>
          <Button
            className="w-[200px] bg-white hover:text-white border-white"
            variant={"outline"}
            onClick={() => {
              setTimed(true);
              if (!complete) {
                router.push("/quiz");
              } else {
                router.push("/assessment");
              }
            }}
          >
            Play
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
