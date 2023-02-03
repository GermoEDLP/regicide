import { createStyles } from "@mantine/core";

export const useStyles = (component: StylesComponent) => {
  return createStyles(() => styles[component])();
};

export enum StylesComponent {
  Card = "card",
  Actions = "actions",
  Hand = "hand",
  Deck = "deck",
  DiscardDeck = "discardDeck",
  EnemiesDeck = "enemiesDeck",
  Field = "field",
  Header = "header",
  Steps = "steps",
}
const styles: Record<StylesComponent, any> = {
  card: {
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
  },
  actions: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    button: {
      width: "100%",
      marginBottom: 5,
    },
  },
  hand: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    cards: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
  },
  deck: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  discardDeck: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  enemiesDeck: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  field: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  header: {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
    },
    icon: {
      marginRight: -15,
    },
  },
  steps: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    cards: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    icons: {
      height: 50,
      width: 50,
    }
  },
};
