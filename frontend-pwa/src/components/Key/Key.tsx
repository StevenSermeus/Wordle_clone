import React from "react";

interface Letter {
  letter: string;
  state: string;
}

type prop = {
  state: Letter;
  letter: string;
  handleClik: (letter: string) => void;
};
function Key({ state, letter, handleClik }: prop) {
  return (
    <div
      className={` key btn ${state.state}`}
      onClick={() => handleClik(letter)}
    >
      {letter}
    </div>
  );
}

export default Key;
