import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export const checkExpiry = () => {
  const token = Cookies.get("token");
  if (!token) {
    return true;
  }
  if(token){
    const decodedToken = jwtDecode(token); 
    const currentTime: number = Date.now() / 1000;
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    return true;
  } else {
    return false;
  }
  }
  
};