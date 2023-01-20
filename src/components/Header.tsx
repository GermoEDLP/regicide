import {
  createStyles,
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { back } from "../store/slices";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { IconArrowNarrowLeft } from "@tabler/icons";
import { StylesComponent, useStyles } from "./ui/styles";

interface HeaderProps {
  links: { link: string; label: string }[];
}

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles(StylesComponent.Header);
  const dispatch = useAppDispatch();
  const { historyPosition } = useAppSelector((state) => state.router);
  return (
    <MantineHeader height={60} mb={10}>
      <Container className={classes.header}>
        <h2>Regicide</h2>
        <Button
          hidden={historyPosition === 0}
          size="sm"
          variant="outline"
          onClick={() => dispatch(back())}
          leftIcon={<IconArrowNarrowLeft className={classes.icon} size={20} />}
        ></Button>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </MantineHeader>
  );
}
