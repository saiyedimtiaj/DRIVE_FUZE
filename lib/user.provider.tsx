import { getCurrentUser } from "@/services/auth.services";
import { TUser } from "@/type";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type TContext = {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

export const UserContext = createContext<undefined | TContext>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const handleUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
      setIsLoading(false);
    };
    handleUser();
  }, [setIsLoading, isLoading, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the user provider context");
  }
  return context;
};
export default UserProvider;
