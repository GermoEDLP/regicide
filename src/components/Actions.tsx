import { Button, Container, createStyles, Text } from "@mantine/core";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store/hooks";
import { stoleCardsFromDeck } from "../store/slices";
import { Toasts } from "./ui/Toasts";

export const Actions = () => {
  const dispatch = useAppDispatch();
  const { classes } = createStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    button: {
      width: "100%",
      marginBottom: 5,
    },
  }))();
  const robar = () => {
    dispatch(stoleCardsFromDeck(1));
  };
  const atacar = () => {
    Toasts.warning("Para atacar debes seleccionar al menos una carta de tu mano");
  };
  return (
    <>
      <Container className={classes.container}>
        <Text size="sm">Acciones</Text>
        <Button className={classes.button} onClick={atacar}>
          Atacar
        </Button>
        <Button className={classes.button} onClick={robar}>
          Robar
        </Button>
      </Container>
    </>
  );
};
