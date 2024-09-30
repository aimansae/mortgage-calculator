import React from "react";

import ShowResults from "./ShowResults";
import NoResults from "./NoResults";

type ResultsType = {
  isCalculated: boolean;
  monthlyPayment: number | null;
  totalRepayment: number | null;
};

const Results = ({
  isCalculated,
  monthlyPayment,
  totalRepayment,
}: ResultsType) => {
  return (
    <div className="">
      {!isCalculated ? (
        <NoResults />
      ) : (
        <ShowResults
          monthlyPayment={monthlyPayment}
          totalRepayment={totalRepayment}
        />
      )}
    </div>
  );
};

export default Results;
