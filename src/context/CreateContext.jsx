import { createContext, useContext, useState } from "react";



let AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{

    let [condata,setConData] = useState({
        isLoggedIn:false,
        currentUserName:null,
        currentUserId:null,
        currentUserRole:null
    })
// console.log('Data form Useontext ',condata);
return <AuthContext.Provider value={{condata,setConData}}>
    {children}
</AuthContext.Provider>;

}

export const useAuth = ()=>{
    return useContext(AuthContext)
}