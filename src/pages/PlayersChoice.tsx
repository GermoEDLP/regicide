import { Button, createStyles } from "@mantine/core";
import { Toasts } from "../components/ui/Toasts";
import { useAppDispatch } from "../store/hooks";
import { PosibleRoute } from "../store/interfaces";
import { changeTo, setPlayers, startGame } from "../store/slices";

export const PlayersChoice = () => {
  const dispatch = useAppDispatch();
  const select = (players: number) => {
    if (players !== 1) {
      Toasts.info(
        "Las opciones multijuador no estan disponibles en esta version"
      );
      return;
    }
    dispatch(startGame(players));
    dispatch(changeTo(PosibleRoute.GAME));
  };
  return (
    <div className="card">
      <h4 className="text-center">Elija la cantidad de jugadores</h4>
      <div className="flex justify-content-center flex-wrap card-container yellow-container">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex align-items-center justify-content-center w-4rem h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-5"
          >
            <Button
              variant="outline"
              onClick={() => select(item)}
            >{`${item} jugador${item > 1 ? "es" : ""}`}</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
