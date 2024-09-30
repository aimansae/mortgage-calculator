import React from "react";
import emptyImage from "../../public/assets/illustration-empty.svg";
import Image from "next/image";

const NoResults = () => {
  return (
    <div className="text-center text-xs">
      <Image src={emptyImage} alt="" width={100} className="mx-auto" />
      <h3 className="mt-4 font-bold text-white">Results Shown Here</h3>
      <p className="mt-2">
        Complete the form and click &apos;Calculate repayment&apos; to see what
        your monthly repayments will be.
      </p>
    </div>
  );
};

export default NoResults;
