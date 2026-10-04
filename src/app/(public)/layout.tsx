import React from "react";
import { headers } from "next/headers";

import AnimationWrapper from "@/components/AnimationWrapper";
import PageTransition from "@/components/transitions/PageTransition";

type TProps = {
  children: React.ReactNode;
};

const GroupLayout = async ({ children }: TProps) => {
  const headersList = await headers();
  const isBot = headersList.get("x-is-bot")?.toLowerCase() === "true";

  return (
    <PageTransition>
      <AnimationWrapper isBot={isBot}>{children}</AnimationWrapper>
    </PageTransition>
  );
};

export default GroupLayout;
