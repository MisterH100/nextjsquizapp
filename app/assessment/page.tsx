import { Assessment } from "@/components/Assessment";
export default function AssessmentPage() {
  return (
    <div className="min-h-screen p-2 md:p-24 flex justify-center">
      <div className="w-full text-white flex flex-col items-center pt-40 md:pt-10">
        <Assessment />
      </div>
    </div>
  );
}
