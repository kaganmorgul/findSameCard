import Header from "./Header/Header";
import Cards from "./Cards/Cards";
import Footer from "./Footer/Footer";
import { useSelector } from "react-redux";
import "./index.scss";
const Main = () => {
  const { scoreSuccessCount, data } = useSelector((state) => state.control);
  return (
    <div className="Main">
      {scoreSuccessCount !== data.length / 2 && <Header />}
      <Cards />
      {scoreSuccessCount !== data.length / 2 && <Footer />}
    </div>
  );
};

export default Main;
