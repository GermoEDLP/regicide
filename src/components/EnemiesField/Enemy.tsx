import { Card } from "../Card";
import { useAppSelector } from "../../store/hooks";

export const Enemy = () => {
  const { enemy } = useAppSelector((state) => state.game);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card card={enemy} giant />
    </div>
  );
};
