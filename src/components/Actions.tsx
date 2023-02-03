import { Button, Container, createStyles, Text } from "@mantine/core";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { attack, stoleCardsFromDeck } from "../store/slices";
import { StylesComponent, useStyles } from "./ui/styles";
import { Toasts } from "./ui/Toasts";

export const Actions = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles(StylesComponent.Actions);
  const StepButtonName = ["Atacar", "Aplicar efecto", "Dañar", "Recibir daño"];
  const { stages, hand } = useAppSelector((state) => state.game);
  const robar = () => {
    dispatch(stoleCardsFromDeck(1));
  };
  const accion = (stage: number) => {
    switch (stage) {
      case 1:
        if (!hand.some((c) => c.select))
          return Toasts.warning("Selecciona al menos una carta");
        dispatch(attack());
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm">Acciones</Text>
        <Button className={classes.button} onClick={() => accion(stages)}>
          {StepButtonName[stages - 1]}
        </Button>
        <Button
          className={classes.button}
          onClick={robar}
          hidden={stages !== 1}
        >
          Robar
        </Button>
      </Container>
    </>
  );
};
