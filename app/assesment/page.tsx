'use client'
import { Assesment } from "@/components/Assesment";

export default function QuizPage() {
 
  return (
      <div className="min-h-screen p-2 md:p-24 flex justify-center">
        <div className="w-full text-white flex flex-col items-center pt-40 md:pt-10">
          <div className={`w-full rounded-t-xl bg-white text-black text-center mb-4 p-2 font-bold text-5xl`}>
            Quiz Me!
          </div>
          <Assesment/>
        </div>
      </div>
  );
}
