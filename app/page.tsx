'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IQuiz, useQuizContext } from "@/lib/globalContext";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import stopWatch from "@/public/stopwatch.svg"
import calmFace from "@/public/calmface.svg"
import pointsIcon from "@/public/points.svg";
import correctIcon from "@/public/correct.svg";
import incorrectIcon from "@/public/incorrect.svg";
import { Separator } from "@/components/ui/separator";
import { Modal } from "@/components/Modal";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
const {player,setTimed,points,complete,setCorrectQuizzes,correctQuizzes,setInCorrectQuizzes,inCorrectQuizzes,setComplete,setPoints} = useQuizContext();
const [delay,setDelay] = useState(true);
const router = useRouter();

useEffect(()=>{
  setTimeout(() => {
    setDelay(false)
  }, 2000);
},[])

  return (
    <main className="min-h-screen">
      {!delay&&
        !player.loggedIn&&<Modal/>
      }
      {complete?
        <div className="flex justify-center pt-40">
          <Card className="w-full sm:w-[500px] md:w-[850px] bg-white border-none mb-10 mx-auto rounded-t-xl">
            <CardHeader>
              <CardTitle className="text-xl truncate">{player.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg truncate">Stats</CardTitle>
              <Separator className="bg-gray-500"/>
              <Link href="/assesment" className="py-4">
                <p className="flex text-bold text-lg gap-2 pt-2">
                  <Image src={pointsIcon} alt="points-icon" width={24} height={24}/> Points: <span className="font-bold">{points}</span>
                </p>
                <p className="flex text-bold text-lg gap-2 pt-2">
                  <Image src={correctIcon} alt="correct-icon" width={24} height={24}/>Correct quizes: <span className="font-bold">{correctQuizzes.length}</span>
                </p>
                <p className="flex text-bold text-lg gap-2 pt-2">
                <Image src={incorrectIcon} alt="correct-icon" width={24} height={24}/> Incorrect Quizes: <span className="font-bold">{inCorrectQuizzes.length}</span>
                
                </p>
              </Link>
              <Separator className="bg-gray-500"/>
              <Button  
                className="bg-red-600 text-white w-full md:w-[200px] rounded text-center text-xl hover:bg-white hover:text-black border border-white hover:border-black mt-4"
                onClick={()=>{
                  setCorrectQuizzes([])
                  setInCorrectQuizzes([])
                  setPoints(0)
                  setComplete(false)
                  setTimed(false)
                }}
                >Reset
              </Button>
            </CardContent>
          </Card>
        </div>:
        <div className="flex justify-center pt-40">
          <Card className="w-full md:w-[850px] bg-white border-none mb-10 rounded-t-xl">
            <CardHeader>
              <CardDescription>Welcome
                <span className="font-bold pl-2">{player?player.username:null}</span>
              </CardDescription>
              <CardTitle className="text-black text-center p-2 font-bold text-5xl">Quiz Me!</CardTitle>
            </CardHeader>
          </Card>
        </div>
      }
      <div className="flex justify-center gap-10 flex-wrap pb-10">
        <Card className="w-full md:w-[400px] bg-blue-800 border-none">
          <CardHeader className="text-white">
            <CardTitle>Play Normal</CardTitle>
            <CardDescription>Play with infinite time to think and research if you want</CardDescription>
          </CardHeader>
          <CardContent className="w-full flex items-center flex-col gap-10">
            <div>
              <Image
                src={calmFace}
                alt="calm-face"
                width={200}
                height={200}
              />
            </div>
            <Button 
              className="w-[200px] bg-white hover:text-white border-white"
              variant={"outline"}
              onClick={()=>router.push("/quiz")}>Play
              </Button>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[400px] bg-red-600 border-none">
          <CardHeader className="text-white">
            <CardTitle>Play Timed</CardTitle>
            <CardDescription>Play with 5 seconds on the clock, quizes will be automatically skipped when time runs out</CardDescription>
          </CardHeader>
          <CardContent className="w-full flex items-center flex-col gap-10">  
            <div>
              <Image
                src={stopWatch}
                alt="stop-watch"
                width={200}
                height={200}
              />
            </div>
            <Button 
              className="w-[200px] bg-white hover:text-white border-white"
              variant={"outline"}
              onClick={()=>{
                setTimed(true)
                router.push("/quiz")
              }}>Play
            </Button>
          </CardContent>
        </Card>
      </div>    
    </main>
  );
}

