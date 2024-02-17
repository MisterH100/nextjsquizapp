import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuizContext } from "@/lib/globalContext"
import Link from "next/link";
import { useEffect } from "react";

export const Assesment =()=>{
    const {currCorrectQuizzes,currIncorrectQuizzes,points,expired,getTimeStamp} = useQuizContext();
    const currTotalQuizzes = currCorrectQuizzes.length + currIncorrectQuizzes.length;

    useEffect(()=>{
        getTimeStamp()
    },[])
    return(
        <div className="w-full text-black">

            {expired && currTotalQuizzes <1?
                <Card className="border-none bg-white p-4 w-full min-h-[150px]">
                    <CardHeader >
                        <CardTitle>come back tommorrow</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Fresh quiz questions will be available in 2 days</p>
                    </CardContent>
                </Card>:
            
                <div className="flex gap-4 flex-col items-center md:flex-row">
                    <Card className="border-none bg-white p-4 w-full md:w-1/2 min-h-[150px]">
                        <CardHeader>
                            <CardTitle className="">Correct</CardTitle>
                            <CardDescription>{currCorrectQuizzes.length}</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <ScrollArea className="h-48 rounded-md border">
                            {currCorrectQuizzes.map((correctQ,index)=>
                            <div key={index} className="w-full border border-gray-600 p-2 mb-2 text-base font-normal">
                                <div>
                                    <p>Q: {correctQ?.question}</p>
                                    <p className="text-blue-800">A: {correctQ?.correctAnswer}</p>
                                </div>
                            </div>
                            )}
                        </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card className="border-none bg-white p-4 w-full md:w-1/2 min-h-[150px]">
                        <CardHeader>
                            <CardTitle>Incorrect</CardTitle>
                            <CardDescription>{currIncorrectQuizzes.length}</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <ScrollArea className="h-48 rounded-md border">
                            {currIncorrectQuizzes.map((incorrectQ,index)=>
                            <div key={index} className="w-full border border-gray-600 p-2 mb-2 text-base font-normal">
                                <div>
                                    <p>Q: {incorrectQ.question}</p>
                                    <div className="flex justify-between">
                                        <p className="text-blue-800">A: {incorrectQ?.correctAnswer}</p>
                                        <p className="text-red-600">{incorrectQ?.answer}</p>
                                    </div>
                                </div>
                            </div>
                            )}
                        </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            }
            <div className="w-full bg-blue-800 p-2 mt-4 text-white font-bold text-5xl text-center rounded-b-xl">
                <p>Points: {points}</p>
            </div>
            <div className="w-full flex justify-center gap-10 mt-10 h-10">
                <Link href={"/"} className="bg-white text-black w-[200px] rounded text-center text-xl flex justify-center items-center">Home</Link>
            </div>
        </div>
    )
}