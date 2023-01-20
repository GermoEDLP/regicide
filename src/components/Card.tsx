import { createStyles, Paper, Container } from "@mantine/core";
import reverseImage from "../assets/img/reverso.jpg";
import { Card as CardType, DeckType } from "../store/interfaces";
import cartas from "../assets/img/cartas4.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSelectCard } from "../store/slices";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    width: 70,
    height: 90,
    border: "2px solid ",
    marginTop: 10,
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
  selected: {
    boxShadow: "0 0 5px blue",
    marginTop: 0,
  },
  handCard: {
    marginLeft: -20,
  },
}));

export const Card = ({
  card,
  reverse,
  i,
  hand: handDeck,
}: {
  card?: CardType | null;
  reverse?: boolean;
  i?: number;
  hand?: boolean;
}) => {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  const { hand } = useAppSelector((state) => state.game);
  const toggleSelect = () => {
    i && !card?.disabled && dispatch(toggleSelectCard(i - 1));
  };
  return (
    <Paper
      radius="md"
      withBorder
      className={cx(classes.card, {
        [classes.selected]: card?.select,
        [classes.handCard]: handDeck,
      })}
      onClick={toggleSelect}
    >
      {!card ? (
        reverse ? (
          <img src={reverseImage} alt="reverso" className={classes.image} />
        ) : null
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
