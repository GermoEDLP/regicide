import { createStyles, Paper, Container } from "@mantine/core";
import reverseImage from "../assets/images/cards_0.png";
import { Card as CardType, DeckType } from "../store/interfaces";
import cartas from "../assets/images/cards_0.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSelectCard } from "../store/slices";
import { StylesComponent, useStyles } from "./ui/styles";

export const Card = ({
  card,
  cant,
  reverse,
  giant,
  i,
  hand: handDeck,
}: {
  card?: CardType | null;
  cant?: string;
  reverse?: boolean;
  giant?: boolean;
  i?: number;
  hand?: boolean;
}) => {
  const { classes, cx } = useStyles(StylesComponent.Card);
  const dispatch = useAppDispatch();
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
          <>
            <div
              style={{
                backgroundImage: `url(${cartas})`,
              }}
              className={classes.reverse}
            ></div>
            {cant && <div className={classes.cant}>{cant}</div>}
          </>
        ) : (
          <>
            <div className={classes.empty}></div>
            {cant && <div className={classes.cant}>{cant}</div>}
          </>
        )
      ) : (
        <>
          <div
            className={giant ? classes.giant : classes.cards}
            style={{
              backgroundPosition: card.bgp,
              backgroundImage: `url(${cartas})`,
            }}
          ></div>
        </>
      )}
    </Paper>
  );
};
