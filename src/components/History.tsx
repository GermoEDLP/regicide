import { Badge, Group, Text, Container, List, ThemeIcon } from "@mantine/core";
import { StylesComponent, useStyles } from "./ui/styles";
import { useAppSelector } from "../store/hooks";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons";

export const History = () => {
  const { classes } = useStyles(StylesComponent.History);
  const { history } = useAppSelector((state) => state.game);
  return (
    <Container className={classes.container}>
      <Text size="sm" color={"dimmed"} align="center">
        Historial
      </Text>
      <List spacing={-3} size="sm" className={classes.dialog} id="history">
        {history.map((item, index) => (
          <List.Item key={index} icon={<item.icon size={15}/>}>
            {item.action}
          </List.Item>
        ))}
      </List>
    </Container>
  );
};
