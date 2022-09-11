import Grid from "../../components/Grid/Grid";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
function Wordle() {
  const [size, setSize] = useState(5);
  return (
    <>
      <NavBar />
      <Grid size={size}></Grid>
      <div
        className={
          "btn-group flex justify-center content-center items-center mx-auto mt-5"
        }
      >
        <button
          className={"btn btn-outline btn-info"}
          onClick={() => setSize(5)}
        >
          5 lettres
        </button>
        <button
          className={"btn btn-outline btn-info"}
          onClick={() => setSize(6)}
        >
          6 lettres
        </button>
        <button
          className={"btn btn-outline btn-info"}
          onClick={() => setSize(7)}
        >
          7 lettres
        </button>
      </div>
    </>
  );
}

export default Wordle;
