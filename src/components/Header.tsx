import {
  createStyles,
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { back, restartGame } from "../store/slices";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { IconArrowNarrowLeft } from "@tabler/icons";
import { StylesComponent, useStyles } from "./ui/styles";
import Swal from "sweetalert2";

interface HeaderProps {
  links: { link: string; label: string }[];
}

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles(StylesComponent.Header);
  const dispatch = useAppDispatch();
  const { historyPosition } = useAppSelector((state) => state.router);
  const leftGame = () => {
    Swal.fire({
      title: "Estas seguro de cerrar la partida?",
      text: "Perderás todo lo que hayas hecho hasta ahora!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, cierrala!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(restartGame());
        dispatch(back());
      }
    });
  };
  return (
    <MantineHeader height={60} mb={10}>
      <Container className={classes.header}>
        <h2>Regicide</h2>
        <Button
          hidden={historyPosition === 0}
          size="sm"
          variant="outline"
          onClick={leftGame}
          leftIcon={<IconArrowNarrowLeft className={classes.icon} size={20} />}
        ></Button>
      </Container>
    </MantineHeader>
  );
}
