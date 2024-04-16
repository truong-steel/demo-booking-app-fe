import { useNavigate } from "react-router-dom";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import ListHomestay from "../list/ListHomestay";
import "./home.css";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <h2 className="homeTitle" onClick={() => navigate('/list')}>Browse all homestays</h2>
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;