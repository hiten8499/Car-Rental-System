import { createContext, use, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// Set base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Create context
export const AppContext = createContext();

// AppProvider component
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cars, setCars] = useState([]);

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data');
      if (data?.success) {
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

   // Function to fetch all cars

    const fetchCars = async () => {
        try {
            
            const {data} = await axios.get('/api/user/cars')
            data.success? setCars(data.cars) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)   
        }
    }



     //Function to Logout

      const logout = () => {   

        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = '';
        toast.success('Logged out successfully');
      }


  // Retrieve token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    fetchCars();
  }, []);

  // Fetch user when token changes
  useEffect(() => {
    if (token) {
      // Set token for axios headers
      axios.defaults.headers.common['Authorization'] = token;
      fetchUser();
    }
  }, [token]);

  // Context value should include state and setters for Fast Refresh stability
  const value = {
    navigate,currency,axios,user,setUser,token,setToken,isOwner,setIsOwner,
    fetchUser,showLogin,setShowLogin,logout,fetchCars,cars,setCars,
    pickupDate,setPickupDate,returnDate,setReturnDate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
