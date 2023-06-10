import { Navigate } from "react-router-dom";

interface IProtected {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const Protected = ({ isAuthenticated, children }: IProtected) => {
  // if not autheticated redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>children</>;
};

export default Protected;
