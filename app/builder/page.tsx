import { BuilderContent } from "@/app/components/BuilderContent";
import { Suspense } from "react";

export default function Builder() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>}>
      <BuilderContent />
    </Suspense>
  );
}
