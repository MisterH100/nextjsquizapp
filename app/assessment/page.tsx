"use client";
import { Assessment } from "@/components/Assessment";
import { Loading } from "@/components/Loading";
import { useQuizContext } from "@/lib/globalContext";

export default function AssessmentPage() {
  const { loading } = useQuizContext();
  return (
    <div className="min-h-screen p-2 md:p-24 flex justify-center">
      {loading && <Loading />}
      <div className="w-full text-white flex flex-col items-center pt-40 md:pt-10">
        <div
          className={`w-full rounded-t-xl bg-white text-black text-center mb-4 p-2 font-bold text-5xl`}
        >
          Quiz Me!
        </div>
        <Assessment />
      </div>
    </div>
  );
}
