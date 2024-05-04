import { createContext, useState } from "react";

export const Datacontext = createContext(null);

const Dataprovider = ({ children }) => {
  const [Account, setAccount] = useState({ username: "", name: "" });
  return (
    <Datacontext.Provider
      value={{
        Account,
        setAccount,
      }}
    >
      {children}
    </Datacontext.Provider>
  );
};

export default Dataprovider;
