import { useLoaderData } from "react-router-dom";

import { toast } from "react-toastify";

import { fetchData, createBudget, wait } from "../utils/helper";
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

export const dashboardServicesLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName }
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
}

export const DashboardServices = () => {
  const { userName, budgets } = useLoaderData()

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {/* {budgets ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : <Intro />}
    </>
  )
}

