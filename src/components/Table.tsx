import { Container, Text } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import { Card } from "./Card";
import { StylesComponent, useStyles } from "./ui/styles";

export const Table = () => {
  const { field } = useAppSelector((state) => state.game);

  const { classes } = useStyles(StylesComponent.Hand);
  return (
    <>
      <Container className={classes.container}>
        <Container className={classes.cards} mb={field.length === 0 ? 150 : 0}>
          {field.map((card, i) => (
            <Card card={card} i={i + 1} key={i} hand />
          ))}
        </Container>
      </Container>
    </>
  );
};
