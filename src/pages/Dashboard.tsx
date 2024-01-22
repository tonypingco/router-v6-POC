// rrd imports
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

// helper functions
import { fetchData, createBudget, createExpense, wait } from "../utils/helper";

export const dashboardServicesLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets }
}

export async function dashboardAction({ request }) {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}!`);
    } catch (e) {
      throw new Error("There was a problem creating your account. Please try again.")
    }

  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      })
      return toast.success("Budget created!")
    } catch (e) {
      throw new Error("There was a problem creating your budget.")
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} created!`)
    } catch (e) {
      throw new Error("There was a problem creating your expense.")
    }
  }
}

export const DashboardServices = () => {
  const { userName, budgets } = useLoaderData()

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className='grid-sm'>
            {
              budgets && budgets.length > 0 ? (
                <div className='grid-lg'>
                  <div className='flex-lg'>
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets} />
                  </div>
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom.</p>
                  <p>Create a budget to get started!</p>
                </div>
              )
            }

          </div>
        </div>
      ) : <Intro />}
    </>
  )
}

