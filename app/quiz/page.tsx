'use client'
import { Assesment } from "@/components/Assesment";
import {useQuizContext } from "@/lib/globalContext";
import { Quiz } from "@/components/Quiz";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QuizPage() {
  const {complete} = useQuizContext();
 
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen p-2 md:p-24 flex justify-center">
        <div className="w-full text-white flex flex-col items-center pt-40 md:pt-10">
          <div className={`${!complete?"w-full md:w-[500px]":"w-full"} rounded-t-xl bg-white text-black text-center mb-4 p-2 font-bold text-5xl`}>
            Quiz Me!
          </div>
          {!complete? <Quiz/>:<Assesment/>}
        </div>
      </div>
    </QueryClientProvider>
  );
}