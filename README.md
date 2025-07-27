# Mortgage calculator

A fully responsive mortgage repayment calculator built using **Next.js**, **React Hook Form**, and **Tailwind CSS**. This app allows users to estimate monthly payments based on loan amount, interest rate, repayment term, and mortgage type.

![Mortgage Calculator Preview](./public/assets/amIResponsive.PNG)

Please find the live site [here](https://mortgage-calculator-cyan.vercel.app/).

The Github Repository link can be found [here](https://github.com/aimansae/mortgage-calculator)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Challenges](#challenges)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Credits](#credits)

## Features

- Real-time mortgage repayment calculation
- Support for **Repayment** and **Interest Only** types
- Displays **monthly payment** and **total repayment**
- **Responsive** layout for all devices
- Client-side **form validation** with custom rules
- Uses **React Hook Form** for clean state handling
- Custom UI with Tailwind CSS

## Technologies used

- [**Next.js**](https://nextjs.org/) – React framework for server-side rendering and routing
- [**React**](https://react.dev/) – Core library for building UI
- [**TypeScript**](https://www.typescriptlang.org/) – Strong typing and developer tooling
- [**Tailwind CSS**](https://tailwindcss.com/) – Utility-first CSS framework
- [**React Hook Form**](https://react-hook-form.com/) – For managing form state and validation
- [**Next Image**](https://nextjs.org/docs/api-reference/next/image) – Optimized image loading


## Getting Started

```bash
git clone https://github.com/aimansae/mortgage-calculator
cd mortgage-calculator
2. Install dependencies
npm install
3. Run the development server
npm run dev
```
Open http://localhost:3000 in your browser to view the app locally.


## Deployment
This app is deployed with [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Connect the repository to Vercel
3. In VS Code, run:
```bash
npm run build
```
## Challenges

1. Custom Validation for Interest Rate

Ensuring the interest rate was a valid decimal and greater than zero required two separate validation functions:
```bash 
const isPositive = (value: string) => parseFloat(value) > 0 || "Interest rate must be positive";
const isValidDecimal = (value: string) => /^\d+(\.\d+)?$/.test(value) || "Invalid number format";
```
These were combined inside the React Hook Form validate config.

2. Switching Between Mortgage Types

Handling calculations for two distinct logic paths (Repayment vs. Interest Only) was tricky. I used conditional logic to ensure correct formula application:

```bash
if (repaymentMethod === "repayment") {
  // Amortized formula
} else {
  // Interest-only formula
}
```
This required extra state tracking and cleanup for monthlyPayment and totalRepayment.
 
3. Handling Form Reset

On clicking "Clear Form", not only the inputs but also the calculated values needed to reset. I used React Hook Form’s reset() and manual state resets:
```bash
reset();
setMonthlyPayment(null);
setTotalRepayment(null);
```
4. Styling Dynamic Radio Selection

I wanted visual feedback when a mortgage type was selected. Tailwind classes were conditionally added:
```bash
className={`bg-${repaymentMethod === 'repayment' ? 'customLime' : 'default'}`}
```
5. Error Styling and Messaging

Each form field showed inline validation messages, styled dynamically depending on the error presence:
```bash
{errors.amount && <p className="text-customRed">{errors.amount.message}</p>}
```
6. Responsive Layout Management

Tailwind made responsiveness easier, but keeping two-column layout intact on large screens and stacking on small devices took trial-and-error with md: and flex settings.

7. Learning register and React [useForm()](https://react-hook-form.com/docs/useform)

This project deepened my understanding of how React Hook Form works. I learned:

- How to use the register function to connect form inputs to validation rules.
- How to use useForm() to manage input states, handle form submission, reset the form, and show validation messages.
- How to simplify form logic while keeping the UI clean and reactive.


## Future Improvements
- Add unit tests using Jest and React Testing Library
- Add dark mode toggle
- Animate result output for better UX
- Input formatting (e.g., currency auto-formatting)
- Add tests for:
Mortgage calculation logic,Form validation,Error displays,Radio selection behavior,Reset form functionality

## Credits
This project was inspired by the
Frontend Mentor Mortgage Calculator [Challenge](https://www.frontendmentor.io/solutions/mortgage-repayment-calculator-E5mnj-dWxY)