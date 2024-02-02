import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuizContext } from "@/lib/globalContext"


export const Assesment =()=>{
    const {correctQuizes,inCorrectQuizes,points} = useQuizContext();

    return(
        <div className="w-full text-black">
            <div className="flex gap-4">
                <Card className="border-none bg-white p-4 w-1/2">
                    <CardHeader>
                        <CardTitle>Correct</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <ul>
                        {correctQuizes.map((correctQ)=>
                        <li key={correctQ.id}>
                            <div>
                            <p>{correctQ.question}</p>
                            <p>{correctQ.correctAnswer}</p>
                            </div>
                        </li>
                        )}
                    </ul>
                    </CardContent>
                </Card>
                <Card className="border-none bg-white p-4 w-1/2">
                    <CardHeader>
                        <CardTitle>Incorrect</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <ul>
                        {inCorrectQuizes.map((correctQ)=>
                        <li key={correctQ.id}>
                            <div>
                            <p>{correctQ.question}</p>
                            <p>{correctQ.correctAnswer}</p>
                            </div>
                        </li>
                        )}
                    </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full bg-blue-800 p-2 mt-4 text-white font-bold text-5xl text-center rounded-b-xl">
                <p>Points: {points}</p>
            </div>
        </div>
    )
}