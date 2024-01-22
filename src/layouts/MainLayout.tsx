import { Outlet, useLoaderData } from 'react-router-dom'
import { fetchData } from '../utils/helper'
import Nav from '../components/Nav'

const wave = "https://github.com/coding-in-public/react-router-budget-app/blob/lesson-5/src/assets/wave.svg?raw=true"

export const mainLoader = () => {
  const userName = fetchData('userName')
  return { userName }

}

export const Main = () => {
  const { userName } = useLoaderData() as { userName: string }

  return (
    <div className='layout'>
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt='wave' />
    </div>
  )
}
