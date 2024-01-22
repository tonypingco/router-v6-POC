import { useRouteError, Link, useNavigate } from "react-router-dom"
import { ArrowUturnUpIcon, HomeIcon } from "@heroicons/react/24/solid";

export const Error = () => {
  const error = useRouteError();

  const navigate = useNavigate();

  return (
    <div className='error'>
      <h1>Uh oh! We&apos;ve got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className='flex-md'>
        <button className='btn btn--light' onClick={() => navigate(-1)}>
          <ArrowUturnUpIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className='btn btn--dark'>

          <HomeIcon width={20} />
          <span>Go home</span></Link>
      </div>
    </div>
  )
}
