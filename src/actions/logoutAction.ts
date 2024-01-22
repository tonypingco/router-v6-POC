import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// helpers
import { deleteItem } from '../utils/helper';

export async function logoutAction() {
  // delete user token
  deleteItem({
    key: 'userName'
  })
  toast.success("Logout successful")

  // return redirect

  return redirect("/")
}
