'use client'
import { Assesment } from "@/components/Assesment";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";
import { IQuiz, useQuizContext } from "@/lib/globalContext";
import { useEffect, useState } from "react";


export default function Home() {
  const {complete,start} = useQuizContext();
  const [quizes, setQuizes] = useState<IQuiz[]>([ {} as IQuiz]);

  useEffect(()=>{
    setQuizes([
      {
        id: 1,
        question:"what is an apple",
        answers:[{id:1,name: "fruit"},{id:2,name: "vegetable"},{id:3,name: "phone"}],
        correctAnswer: "fruit",
        points: 50,
        answerd:false
      },
      {
        id: 2,
        question:"whats the opposite of black",
        answers:[{id:1,name: "green"},{id:2,name: "white"},{id:3,name: "red"}],
        correctAnswer: "white",
        points: 40,
        answerd:false
      },
      {
        id: 3,
        question:"What is Drake known for",
        answers:[{id:1,name: "memes"},{id:2,name: "acting"},{id:3,name: "music"}],
        correctAnswer: "music",
        points: 25,
        answerd:false
      }
    ])
  },[])


  return (
    <main className="min-h-screen p-24 flex justify-center">
      <div className="w-full text-white flex flex-col items-center">
        <div className={`${!complete?"w-[500px]":"w-full"} rounded-t-xl bg-white text-black text-center mb-4 p-2 font-bold text-5xl`}>
          Quiz Me!
        </div>
        {!complete? <Quiz quizes={quizes}/>:<Assesment/>}
        <div className="w-full flex justify-center pt-10">
          <Button onClick={start} className="w-[500px] bg-white text-black hover:bg-white">Start</Button>
        </div>
      </div>
    </main>
  );
}
