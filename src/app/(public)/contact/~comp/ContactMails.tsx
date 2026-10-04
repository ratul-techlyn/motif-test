import React from "react";
import SocialLinks from "@/components/shared/SocialLinks";



export default function ContactMails() {
  return (
    <>
      <p className="font-clash-display text-base font-medium md:text-lg">
        Business Queries
      </p>
      <p className="mb-6 fo font-helvetica  text-base md:text-lg font-normal text-white">
        business@wemotif.com
      </p>
      <p className="font-clash-display  text-base font-medium md:text-lg">
        Press inquiries
      </p>
      <p className="mb-6 font-helvetica text-base md:text-lg text-white">
        press@wemotif.com
      </p>
      <p className="font-clash-display  text-base font-medium md:text-lg">
        Everything else
      </p>
      <p className="mb-6 font-helvetica text-base md:text-lg text-white">
        hey@wemotif.com{" "}
      </p>
      <p className="font-clash-display  text-base font-medium md:text-lg">
        Phone
      </p>
      <p className="mb-6 font-helvetica text-base md:text-lg text-white">
        {" "}
        +1 (415) 800 2326
      </p>

      <div className="mt-8 md:mt-20">
        <SocialLinks />
      </div>
    </>
  );
}
