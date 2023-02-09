import { Button, Container, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  applyEffects,
  attack,
  makeDamage,
  receiveDamage,
} from "../store/slices";
import { StylesComponent, useStyles } from "./ui/styles";
import { Toasts } from "./ui/Toasts";

export const Actions = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles(StylesComponent.Actions);
  const { stages, hand, enemy } = useAppSelector((state) => state.game);
  const StepButtonName = [
    "Atacar",
    "Efectos",
    "Dañar",
    `${(enemy?.tempHp || 1) <= 0 ? "Finalizar" : "Defender"}`,
  ];
  const accion = (stage: number) => {
    switch (stage) {
      case 1:
        if (!hand.some((c) => c.select))
          return Toasts.warning("Selecciona al menos una carta");
        dispatch(attack());
        break;

      case 2:
        dispatch(applyEffects());
        break;

      case 3:
        dispatch(makeDamage());
        break;

      case 4:
        dispatch(receiveDamage());

      default:
        break;
    }
  };
  const getButtonText = () => {
    if (stages === 4 && enemy && enemy.tempHp <= 0) return "Finalizar";
    return StepButtonName[stages - 1];
  };
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm" color={"dimmed"} mb={10}>
          Acciones
        </Text>
        <Button
          className={classes.button}
          onClick={() => accion(stages)}
          variant="outline"
        >
          {getButtonText()}
        </Button>
      </Container>
    </>
  );
};
