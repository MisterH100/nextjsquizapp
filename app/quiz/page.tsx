'use client'
import { Assesment } from "@/components/Assesment";
import { Button } from "@/components/ui/button";
import { IQuiz, useQuizContext } from "@/lib/globalContext";
import { useEffect, useState } from "react";
import { Quiz } from "@/components/Quiz";


export default function QuizPage() {
  const {complete,start} = useQuizContext();
  const [quizes, setQuizes] = useState<IQuiz[]>([ {} as IQuiz]);

  useEffect(()=>{
    setQuizes([
      {
        id: 1,
        question:"What is an apple",
        answers:[{id:1,name: "fruit"},{id:2,name: "vegetable"},{id:3,name: "phone"}],
        correctAnswer: "fruit",
        points: 50,
        answerd:false,
        answer:""
      },
      {
        id: 2,
        question:"Whats the opposite of black",
        answers:[{id:1,name: "green"},{id:2,name: "white"},{id:3,name: "red"}],
        correctAnswer: "white",
        points: 40,
        answerd:false,
        answer:""
      },
      {
        id: 3,
        question:"What is Drake known for",
        answers:[{id:1,name: "memes"},{id:2,name: "acting"},{id:3,name: "music"}],
        correctAnswer: "music",
        points: 25,
        answerd:false,
        answer:""
      },
      {
        id: 4,
        question:"In the world of technoly what does PC stand for",
        answers:[{id:1,name: "private channel"},{id:2,name: "personal computer"},{id:3,name: "python computer"}],
        correctAnswer: "personal computer",
        points: 45,
        answerd:false,
        answer:""
      },
      {
        id: 5,
        question:"What is Chrome",
        answers:[{id:1,name: "a web browser"},{id:2,name: "a colour"},{id:3,name: "a debbuger"}],
        correctAnswer: "a web browser",
        points: 50,
        answerd:false,
        answer:""
      }
    ])
  },[])
  return (
    <div className="min-h-screen p-2 md:p-24 flex justify-center">
      <div className="w-full text-white flex flex-col items-center pt-40 md:pt-10">
        <div className={`${!complete?"w-full md:w-[500px]":"w-full"} rounded-t-xl bg-white text-black text-center mb-4 p-2 font-bold text-5xl`}>
          Quiz Me!
        </div>
        {!complete? <Quiz quizes={quizes}/>:<Assesment/>}
      </div>
    </div>
  );
}
