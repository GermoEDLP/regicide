import { createStyles, Paper, Container } from "@mantine/core";
import reverseImage from "../assets/img/reverso.jpg";
import { Card as CardType, DeckType } from "../store/interfaces";
import cartas from "../assets/img/cartas4.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSelectCard } from "../store/slices";
import { StylesComponent, useStyles } from "./ui/styles";

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
  const { classes, cx } = useStyles(StylesComponent.Card);
  const dispatch = useAppDispatch();
  const { stages } = useAppSelector((state) => state.game);
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
              style={{
                backgroundPosition: card.bgp,
                backgroundImage: `url(${cartas})`,
              }}
            ></div>
          </Container>
        </>
      )}
    </Paper>
  );
};
