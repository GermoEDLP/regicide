import { createStyles, Paper, Container } from "@mantine/core";
import reverseImage from "../assets/img/reverso.jpg";
import { Card as CardType } from "../store/interfaces";
import cartas from "../assets/img/cartas4.png";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    width: 70,
    height: 90,
    border: "2px solid ",
  },
  image: {
    width: 64,
    height: 85,
    borderRadius: 6,
    marginTop: 0.5,
    marginLeft: 0.5,
  },
  container: {
    overflow: "hidden",
    position: "relative",
    paddingLeft: 1.3,
    paddingTop: 0.5,
  },
  cards: {
    backgroundImage: `url(${cartas})`,
    width: 64,
    height: 85,
    borderRadius: 5,
  },
}));

export const Card = ({ card }: { card: CardType | undefined }) => {
  const { classes } = useStyles();
  return (
    <Paper radius="md" withBorder className={classes.card}>
      {!card ? (
        <img src={reverseImage} alt="reverso" className={classes.image} />
      ) : (
        <>
          <Container className={classes.container}>
            <div
              className={classes.cards}
              style={{ backgroundPosition: card.bgp }}
            ></div>
          </Container>
        </>
      )}
    </Paper>
  );
};
