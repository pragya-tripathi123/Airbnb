import { useEffect, useState } from "react";
import axios from "axios";

import { createContext } from "react";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, [user, ready]);

  // const {subpage} = useParams()
  // console.log(subpage)
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
