import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar"
import { useEffect } from "react";


const Dashboard = ({name}) => {
  const navigate = useNavigate();

  useEffect(() => {    
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
        <TopNavbar name={name} />
        <h1>Welcome, {name}</h1>
    </div>
  )
}

export default Dashboard