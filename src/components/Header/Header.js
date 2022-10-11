import "./Header.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTryCount } from "../../redux/control/controlSlice";
import { useEffect } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const { tryCount, valArray, score } = useSelector((state) => state.control);

  useEffect(() => {
    if (valArray.length === 2) {
      dispatch(setTryCount());
    }
  }, [dispatch, valArray]);
  return (
    <div className="header">
      <p>{`Score: ${score}`}</p>
      {tryCount > 0 && <p>{`Number of Try: ${tryCount}`}</p>}
    </div>
  );
};

export default Header;
