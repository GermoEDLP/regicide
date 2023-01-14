import { Button } from "@mantine/core";
import { useAppDispatch } from "../store/hooks";
import { back } from "../store/slices";

export const Game = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="card m-2">
      <h3>Arena de juego</h3>
      <Button onClick={() => dispatch(back())}>Volver</Button>
      <hr />
      <div className="flex justify-content-center flex-wrap card-container yellow-container"></div>
    </div>
  );
};
