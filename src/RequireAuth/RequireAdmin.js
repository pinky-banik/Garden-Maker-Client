import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Firebase/Firebase.init';
import useAdmin from '../Hooks/useAdmin';
import Loading from '../Components/Shared/Loading';
import { toast } from 'react-toastify';
 
const RequireAdmin = ({children}) => {
    const [user,loading] = useAuthState(auth);
    const [admin,adminLoading] = useAdmin(user);
    let location = useLocation();
   
    if (loading ||adminLoading ) {
      return <Loading/>
    }
 
    if (!user || !admin)  {
        toast.error('You cannot have access to this page');
        return <Navigate to="/" state={{ from: location }} replace  />;
      }
 
    return children;
};
 
export default RequireAdmin;

