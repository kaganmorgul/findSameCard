import "./Card.scss";
import {
  clickedUpdate,
  increaseRotateCount,
  resetRotateCount,
  setValArray,
  resetValArray,
  controlMatchCard,
  controlScore,
  setScoreSuccesCount,
} from "../../../redux/control/controlSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Card = ({ card }) => {
  const { rotateCount, valArray } = useSelector((state) => state.control);
  const [rotateCard, setRotateCard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rotateCount === 2) {
      setTimeout(() => {
        dispatch(resetRotateCount());
        setRotateCard(false);
      }, 800);
    }
  });

  useEffect(() => {
    if (valArray.length === 2) {
      setTimeout(() => {
        dispatch(resetValArray());
      }, 900);
    }
  });

  const setClicked = (id) => {
    dispatch(clickedUpdate(id));
  };

  const setRotateCount = () => {
    dispatch(increaseRotateCount());
  };

  const createValArray = (id) => {
    dispatch(setValArray(id));
  };

  const matchCard = () => {
    dispatch(controlMatchCard());
  };

  const setScore = () => {
    dispatch(controlScore());
  };

  const successControl = () => {
    dispatch(setScoreSuccesCount());
  };

  return (
    <>
      <button
        disabled={
          card.open ||
          (card.clicked && rotateCard) ||
          rotateCount === 2 ||
          valArray.length === 2
            ? true
            : false
        }
        className={
          card.open
            ? "card active open"
            : rotateCard && card.clicked
            ? "card active"
            : !rotateCard
            ? "card"
            : false
        }
        onClick={() => {
          setClicked(card.id);
          setRotateCard(true);
          setRotateCount();
          createValArray(card.id, card.name);
          matchCard();
          setScore();
          successControl();
        }}
      >
        <div className="cardFront">
          <img src={card.image} alt="" />
        </div>
        <div className="cardBack">
          <img src={process.env.PUBLIC_URL + "/symbol.png"} alt="" />
        </div>
      </button>
    </>
  );
};

export default Card;
