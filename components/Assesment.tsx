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
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const Assesment =()=>{
    const {correctQuizes,inCorrectQuizes,points,setCorrectQuizes,setInCorrectQuizes,setComplete,setTimed,setPoints} = useQuizContext();
    const router = useRouter();
    return(
        <div className="w-full text-black">
            <div className="flex gap-4 flex-col items-center md:flex-row">
                <Card className="border-none bg-white p-4 w-full md:w-1/2 min-h-[150px]">
                    <CardHeader>
                        <CardTitle className="">Correct</CardTitle>
                        <CardDescription>{correctQuizes.length}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ScrollArea className="h-48 rounded-md border">
                        {correctQuizes.map((correctQ)=>
                        <div key={correctQ.id} className="w-full border border-gray-600 p-2 mb-2 text-base font-normal">
                            <div>
                                <p>Q: {correctQ.question}</p>
                                <p className="text-blue-800">A: {correctQ.correctAnswer}</p>
                            </div>
                        </div>
                        )}
                    </ScrollArea>
                    </CardContent>
                </Card>
                <Card className="border-none bg-white p-4 w-full md:w-1/2 min-h-[150px]">
                    <CardHeader>
                        <CardTitle>Incorrect</CardTitle>
                        <CardDescription>{inCorrectQuizes.length}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ScrollArea className="h-48 rounded-md border">
                        {inCorrectQuizes.map((incorrectQ)=>
                        <div key={incorrectQ.id} className="w-full border border-gray-600 p-2 mb-2 text-base font-normal">
                            <div>
                                <p>Q: {incorrectQ.question}</p>
                                <div className="flex justify-between">
                                    <p className="text-blue-800">A: {incorrectQ.correctAnswer}</p>
                                    <p className="text-red-600">{incorrectQ.answer}</p>
                                </div>
                            </div>
                        </div>
                        )}
                    </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full bg-blue-800 p-2 mt-4 text-white font-bold text-5xl text-center rounded-b-xl">
                <p>Points: {points}</p>
            </div>
            <div className="w-full flex justify-center gap-10 mt-10">
                <Link href={"/"} className="bg-white text-black w-[200px] rounded text-center text-xl flex justify-center items-center">Home</Link>

                <Button 
                    className="bg-red-600 text-white w-[200px] rounded text-center text-xl hover:bg-white hover:text-black"
                    onClick={()=>{
                        setCorrectQuizes([])
                        setInCorrectQuizes([])
                        setPoints(0)
                        setComplete(false)
                        setTimed(false)
                        router.push("/")
                    }}
                    >Reset
                </Button>
            </div>
        </div>
    )
}