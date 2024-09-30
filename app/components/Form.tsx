"use client";
import { useState } from "react";
import Image from "next/image";
import calculator from "../../public/assets/icon-calculator.svg";
import Results from "./Results";
import Header from "./Header";
import ClearButton from "./ClearButton";
import { useForm } from "react-hook-form";

type FormDataType = {
  amount: string;
  years: string;
  interestRate: string;
  repaymentMethod: string;
};

const Form = () => {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalRepayment, setTotalRepayment] = useState<number | null>(null);
  const [calculated, setCalculated] = useState<boolean>(false); // Track if calculated

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormDataType>({
    defaultValues: {
      amount: "",
      years: "",
      interestRate: "",
      repaymentMethod: "",
    },
  });

  const repaymentMethod = watch("repaymentMethod");

  const onSubmit = (data: FormDataType) => {
    const amount = Number(data.amount.replace(/\./g, ""));
    const years = Number(data.years);
    const interestRate = Number(data.interestRate);

    let totalRepayment = 0;

    if (data.repaymentMethod === "repayment") {
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = years * 12; // Total number of payments

      // Calculate monthly payment using the amortization formula
      const monthlyPayment =
        (amount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      setMonthlyPayment(monthlyPayment);

      // Calculate total repayment
      totalRepayment = monthlyPayment * numberOfPayments;
    } else if (data.repaymentMethod === "interestOnly") {
      const monthlyPayment = (interestRate / 100) * (amount / 12);
      setMonthlyPayment(monthlyPayment);

      // Total repayment = interest paid + principal at end
      totalRepayment = monthlyPayment * years * 12 + amount;
    }

    setTotalRepayment(totalRepayment);
    setCalculated(true);
  };
  const resetForm = () => {
    reset();
    setMonthlyPayment(null);
    setTotalRepayment(null);
    setCalculated(false);
  };

  return (
    <div className="mx-auto flex flex-col md:flex-row md:p-16">
      <div className="flex flex-col p-6 md:w-1/2 md:rounded-l-3xl md:bg-white">
        <Header />
        <ClearButton resetForm={resetForm} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="amount">Mortgage Amount</label>
          <div
            className={`relative mb-3 rounded-md border text-slate-e ${errors.amount ? "border-customRed" : "border-slate-d"}`}
          >
            <span
              className={`font-xl absolute inset-y-0 left-0 flex items-center rounded-l-md border-b-slate-d border-l-slate-d border-t-slate-d px-4 text-slate-d ${errors.amount ? "bg-customRed text-white" : "bg-slate-a text-slate-d"}`}
            >
              $
            </span>
            <input
              {...register("amount", {
                required: "Amount is required",
                minLength: { value: 5, message: "Min length is 5" },
              })}
              type="text"
              name="amount"
              className="w-full rounded-md py-2 pl-12 font-bold hover:cursor-pointer focus:outline-none"
            />
          </div>
          {errors.amount && (
            <p className="mb-3 font-bold text-customRed">
              {errors.amount?.message}
            </p>
          )}

          <label htmlFor="years" className="my-2">
            Mortgage Term (Years)
          </label>
          <div className="relative mb-3 rounded-md border border-slate-d text-slate-e">
            <span
              className={`font-xl absolute inset-y-0 right-0 flex items-center rounded-r-md border-b-slate-d border-r-slate-d border-t-slate-d px-4 ${errors.years ? "bg-customRed text-white" : "bg-slate-a text-slate-d"}`}
            >
              years
            </span>
            <input
              {...register("years", {
                required: "Years are required",
                min: { value: 1, message: "Minimum term is 1 year" },
                max: { value: 50, message: "Maximum term is 50 years" },
              })}
              type="number"
              name="years"
              className="hover:cursor-pointerw-full rounded-md px-2 py-2 pr-12 font-bold focus:outline-none"
            />
          </div>

          {errors.years && (
            <p className="mb-3 font-bold text-customRed">
              {errors.years?.message}
            </p>
          )}

          <label htmlFor="interestRate" className="my-2">
            Interest Rate
          </label>
          <div className="relative mb-3 rounded-md border border-slate-d text-slate-e">
            <span
              className={`font-xl absolute inset-y-0 right-0 flex items-center rounded-r-md border-b-slate-d border-r-slate-d border-t-slate-d px-4 ${errors.years ? "bg-customRed text-white" : "bg-slate-a text-slate-d"}`}
            >
              %
            </span>
            <input
              {...register("interestRate", {
                required: "Interest rate is required",
                min: {
                  value: 0,
                  message: "Minimum rate is 0%",
                },
                validate: {
                  positive: (value) => {
                    const numericValue = parseFloat(value);
                    return numericValue > 0 || "Interest rate must be positive";
                  },
                  decimal: (value) => {
                    const numericValue = parseFloat(value);
                    return (
                      /^(\d+|\d+\.\d+)$/.test(value) || "Invalid number format"
                    ); // Validation for decimal values
                  },
                },
              })}
              type="number"
              step="0.01"
              className="w-full rounded-lg px-2 py-2 pr-12 font-bold hover:cursor-pointer focus:outline-none"
            />
          </div>
          {errors.interestRate && (
            <p className="mb-3 font-bold text-customRed">
              {errors.interestRate?.message}
            </p>
          )}

          <label htmlFor="mortgageType" className="">
            Mortgage Type
          </label>
          <div
            className={`my-4 flex rounded-md p-2 font-bold text-slate-e ${
              repaymentMethod === "repayment"
                ? "bg-customLimeLight border border-customLime"
                : errors.repaymentMethod
                  ? "border border-customRed"
                  : "border border-slate-d"
            }`}
          >
            <input
              {...register("repaymentMethod", {
                required: "Please select a repayment method",
              })}
              type="radio"
              name="repaymentMethod"
              value="repayment"
              className="mr-2 hover:cursor-pointer"
            />
            <label>Repayment</label>
          </div>

          <div
            className={`mb-6 flex rounded-md p-2 font-bold text-slate-e ${
              repaymentMethod === "interestOnly"
                ? "bg-customLimeLight border border-customLime"
                : errors.repaymentMethod
                  ? "border border-customRed"
                  : "border border-slate-d"
            }`}
          >
            <input
              {...register("repaymentMethod", {
                required: "Please select a repayment method",
              })}
              type="radio"
              name="repaymentMethod"
              className="mr-2 hover:cursor-pointer"
              value="interestOnly"
            />
            <label>Interest Only</label>
          </div>

          <div className="flex items-center justify-center rounded-full bg-customLime px-4 py-3">
            <button className="flex items-center text-xs font-bold text-slate-e">
              <Image
                src={calculator}
                alt="calculatorIcon"
                width={18}
                height={18}
                className="mr-1"
              />
              Calculate Repayment
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-grow flex-col bg-slate-e p-6 text-slate-b md:w-1/2 md:items-center md:justify-center md:rounded-bl-3xl">
        <Results
          isCalculated={calculated}
          monthlyPayment={monthlyPayment}
          totalRepayment={totalRepayment}
        />
      </div>
    </div>
  );
};

export default Form;
