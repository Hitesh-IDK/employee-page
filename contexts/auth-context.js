import { createContext, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    loginHandler: function () { },
    logoutHandler: function () { }
});

export function AuthContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = () => {
        setIsLoggedIn(true);
    }

    const logoutHandler = () => {
        setIsLoggedIn(false);
    }

    const context = { isLoggedIn, loginHandler, logoutHandler };
    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}



export default AuthContext;