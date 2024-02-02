
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IAnswers, IQuiz, useQuizContext } from "@/lib/globalContext";
import { useEffect, useState } from "react";

export const Quiz =({quizes}:{quizes:IQuiz[]})=>{
    const {setCorrectQuizes,setPoints,setInCorrectQuizes,setCurrQuiz,setComplete,complete,currQuiz,correctQuizes,inCorrectQuizes} = useQuizContext();
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        if(!complete){
            const timer = setTimeout(() => setProgress((prev) => prev -10), 500)
            return () => clearTimeout(timer)
        }
    },[progress])

    useEffect(()=>{
        if(progress < 1 || progress == 0){
            if(currQuiz < quizes.length){
                setCurrQuiz((prev)=>prev+1);
                setProgress(100)
            }
            if(currQuiz == quizes.length -1 || currQuiz == quizes.length){
                setCurrQuiz(0);
                setComplete(true);
                setProgress(100)
            }
        }
    },[progress])

    const compareAns =(quiz:IQuiz,ans:string)=>{
        if(quiz.correctAnswer == ans){
          setCorrectQuizes([...correctQuizes,{...quiz, answerd: true}]);
          setPoints((prev)=> prev + quiz.points);
          setProgress(100)
        }else{
          setInCorrectQuizes([...inCorrectQuizes,{...quiz, answerd: true}]);
          setProgress(100)
        }
        if(currQuiz < quizes.length){
          setCurrQuiz((prev)=>prev+1);
        }
        if(currQuiz == quizes.length -1 || currQuiz == quizes.length){
          setCurrQuiz(0);
          setComplete(true);
        }
    }

    return(
        <Card className="border-none w-[500px] rounded-b-xl overflow-hidden">
            <CardHeader className="bg-white">
                <Progress value={progress} className="w-full border border-white"/>
            </CardHeader>
            <CardContent className="p-0">
            <form 
            id={quizes[currQuiz].question} 
            className="w-full p-4 text-black bg-white">
            <h1>{quizes[currQuiz].question}</h1>
              <ul className="p-4 flex flex-col gap-4">
                {quizes[currQuiz].answers?.map((ans:IAnswers,index:number)=> 
                  <li 
                    key={index} 
                    className="w-full cursor-pointer">
                    <div>
                      <button 
                        className="text-left w-full border border-blue-800 p-2  active:bg-blue-800"
                        value={ans.name}
                        onClick={(e)=>{
                          e.preventDefault()
                          compareAns(quizes[currQuiz],ans.name)
                        }}
                        >{ans.name}
                      </button>
                    </div>
                  </li>
                )}
              </ul>
          </form>
            </CardContent>
        </Card>
    )
}

