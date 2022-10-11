import { createSlice } from "@reduxjs/toolkit";
import DATA from "../../data/data";
export const controlSlice = createSlice({
  name: "control",
  initialState: {
    data: DATA,
    valArray: [],
    rotateCount: 0,
    score: 0,
    scoreSuccessCount: 0,
    tryCount: 0,
  },
  reducers: {
    clickedUpdate: (state, action) => {
      const id = action.payload;
      const newData = state.data.map((i) => {
        if (i.id === id) {
          return {
            ...i,
            clicked: true,
          };
        }
        return i;
      });
      state.data = newData;
    },
    increaseRotateCount: (state) => {
      state.rotateCount += 1;
    },
    resetRotateCount: (state) => {
      if (state.rotateCount === 2) {
        state.rotateCount = 0;
      }
    },
    setValArray: (state, action) => {
      const id = action.payload;

      const findItem = state.data.find((item) => item.id === id);

      state.valArray = [
        ...state.valArray,
        {
          id: findItem.id,
          name: findItem.name,
          image: findItem.image,
        },
      ];
    },
    resetValArray: (state) => {
      if (state.valArray.length === 2) {
        state.valArray = [];
      }
    },
    controlMatchCard: (state) => {
      if (state.valArray.length === 2) {
        if (state.valArray[0].name === state.valArray[1].name) {
          const newArray = state.data.map((i) => {
            if (
              i.name === state.valArray[0].name &&
              i.name === state.valArray[1].name
            ) {
              return {
                ...i,
                open: true,
              };
            }
            return i;
          });
          state.data = newArray;
        }
      }
    },
    controlScore: (state) => {
      if (state.valArray.length === 2) {
        if (state.valArray[0].name === state.valArray[1].name) {
          state.score += 50;
        } else if (state.valArray[0].name !== state.valArray[1].name) {
          state.score -= 10;
        }
      }
    },
    resetAllVal: (state) => {
      state.valArray = [];
      state.score = 0;
      state.rotateCount = 0;
      state.data = DATA;
      state.scoreSuccessCount = 0;
      state.tryCount = 0;
    },
    setScoreSuccesCount: (state) => {
      if (state.valArray.length === 2) {
        if (state.valArray[0].name === state.valArray[1].name) {
          state.scoreSuccessCount += 1;
        }
      }
    },
    mixedData: (state) => {
      const newArray = [...state.data];

      for (let i = newArray.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * i);
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
      }
      state.data = newArray;
    },
    setTryCount: (state) => {
      if (state.valArray.length === 2) {
        state.tryCount += 1;
      }
    },
  },
});

export const {
  clickedUpdate,
  increaseRotateCount,
  resetRotateCount,
  setValArray,
  resetValArray,
  controlMatchCard,
  controlScore,
  resetAllVal,
  setScoreSuccesCount,
  mixedData,
  setTryCount,
} = controlSlice.actions;

export default controlSlice.reducer;
