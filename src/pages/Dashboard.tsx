import { useLoaderData } from "react-router-dom";

import { toast } from "react-toastify";

import { fetchData } from "../utils/helper";
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

export const dashboardServicesLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName }
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  console.log({ data, request, formData });
  try {
    // throw new Error('test error')
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome ${formData.userName}!`);
  } catch (e) {
    throw new Error("There was a problem creating your account. Please try again.")
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

