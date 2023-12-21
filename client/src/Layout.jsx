import Header from "./Header";
import {Outlet} from 'react-router-dom'
export default function Layout() {
  return (
    <div className="py-4 max-w-7xl px-12 flex flex-col min-h-screen" style={{margin:"auto"}}>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}
