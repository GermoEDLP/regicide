import { Badge, Group, Text, Container } from "@mantine/core";
import { StylesComponent, useStyles } from "./ui/styles";
import { useAppSelector } from "../store/hooks";

export const History = () => {
  const { classes } = useStyles(StylesComponent.History);
  const { history } = useAppSelector((state) => state.game);
  return (
    <Container className={classes.container}>
      <Text size="sm" color={"dimmed"} align="center">
        Historial
      </Text>
      <Group spacing={7} mt={5} className={classes.dialog} id="history">
        {history.map((badge, i) => (
          <Badge color={"gray"} key={i} leftSection={<badge.icon size={15}/>} className={classes.badge} >
            {badge.action}
          </Badge>
        ))}
      </Group>
    </Container>
  );
};
