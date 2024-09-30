import React from "react";

type ShowResultsProps = {
  monthlyPayment: number | null;
  totalRepayment: number | null;
};

const ShowResults = ({ monthlyPayment, totalRepayment }: ShowResultsProps) => {
  return (
    <div className="text-left text-base">
      <h3 className="mb-4 text-xl font-bold">Your Result</h3>
      <p className="mb-4">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click &quot;calculate
        repayments&quot; again.
      </p>
      <div className="bg-slate-f rounded-lg border-t-4 border-customLime p-2">
        <p className="my-2">Your monthly repayment </p>
        <h4 className="border-b-2 pb-2 text-2xl font-bold text-customLime">
          $ {monthlyPayment?.toFixed(2)}
        </h4>
        <p className="my-2">Total you&apos;ll repay over the term</p>
        <h4 className="pb-2 text-2xl font-bold text-customLime">
          $ {totalRepayment?.toFixed(2)}
        </h4>
      </div>
    </div>
  );
};

export default ShowResults;
