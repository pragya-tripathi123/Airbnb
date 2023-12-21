import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect,setRedirect] = useState(null)
    const {ready, user,setUser} = useContext(UserContext)
    let { subpage } = useParams();
    if(subpage === undefined){
      subpage = 'profile'
    }

    async function logout(){
      await axios.post('/logout')
      setRedirect('/')
      setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>;
    }
    if(redirect){
      return <Navigate to={redirect}></Navigate>
    }

  
  
  return (
    <div>
      <AccountNav></AccountNav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage></PlacesPage>}
    </div>
  );
}




// import { useEffect, useState } from "react";
// import axios from "axios";

// import { createContext } from "react";
// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);
//   useEffect(() => {
//     if (!user) {
//       axios.get("/profile").then(({ data }) => {
//         setUser(data);
//         setReady(true);
//       });
//     }
//   }, [user, ready]);

//   // const {subpage} = useParams()
//   // console.log(subpage)
//   return (
//     <UserContext.Provider value={{ user, setUser, ready }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

