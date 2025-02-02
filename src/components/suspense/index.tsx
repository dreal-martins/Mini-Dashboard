import React, { Suspense } from "react";
import Loader from "../loader";

interface Props {
  children: React.ReactNode;
}

export default function ISuspense({ children }: Props) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
