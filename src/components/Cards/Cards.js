import "./Cards.scss";
import Card from "./Card.js/Card";
import { useSelector } from "react-redux";
import { mixedData, resetAllVal } from "../../redux/control/controlSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const Cards = () => {
  const dispatch = useDispatch();
  const [matchEffect, setMatchEffect] = useState(false);
  const [matchEffectItem, setMatchEffectItem] = useState({
    firstName: "",
    firstPhoto: "",
    secondName: "",
    secondPhoto: "",
  });
  const { scoreSuccessCount, data, valArray, score, tryCount } = useSelector(
    (state) => state.control
  );

  const resetAll = () => {
    dispatch(resetAllVal());
  };

  const mixedAll = () => {
    dispatch(mixedData());
  };

  useEffect(() => {
    if (valArray.length === 2) {
      if (valArray[0].name === valArray[1].name) {
        setMatchEffect(true);
        setMatchEffectItem({
          firstPhoto: valArray[0].image,
          secondPhoto: valArray[1].image,
          firstName: valArray[0].name,
          secondName: valArray[1].name,
        });
      }
    }
  }, [valArray]);

  useEffect(() => {
    matchEffect &&
      setTimeout(() => {
        setMatchEffect(false);
      }, 2000);
  }, [matchEffect]);

  useEffect(() => {
    dispatch(mixedData());
  }, [dispatch]);

  return (
    <>
      <div className="cardsArea">
        {data.map((card) => {
          return <Card key={card.id} card={card} />;
        })}
        <h1 className={matchEffect ? "match active" : "match"}>Match!!</h1>
        <div
          className={matchEffect ? "denemeCardLeft active" : "denemeCardLeft"}
        >
          {<img src={matchEffectItem.firstPhoto} alt="" />}
          <h2>{matchEffectItem.firstName}</h2>
        </div>
        <div
          className={matchEffect ? "denemeCardRight active" : "denemeCardRight"}
        >
          {<img src={matchEffectItem.secondPhoto} alt="" />}
          <h2>{matchEffectItem.secondName}</h2>
        </div>
        <div
          className={
            scoreSuccessCount === data.length / 2
              ? "completed active"
              : "completed"
          }
        >
          <h1>CONGRATULATIONS</h1>
          <div className="completedInfo">
            <span>{`Score: ${score}`}</span>
            <span>{`Number of Try: ${tryCount}`}</span>
          </div>
          <button
            className="playAgain"
            onClick={() => {
              resetAll();
              mixedAll();
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default Cards;
