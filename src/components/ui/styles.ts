import { createStyles, CSSObject } from "@mantine/core";

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
  History = "history",
  Stat = "stat",
  Number = "number",
}
const styles: Record<StylesComponent, Record<string, CSSObject>> = {
  card: {
    card: {
      position: "relative",
      overflow: "visible",
      width: 100,
      height: 140,
      marginTop: 10,
    },
    giant: {
      width: 100,
      height: 140,
      borderRadius: 5,
      backgroundSize: "1400% 400%",
    },
    reverse: {
      width: 100,
      height: 140,
      borderRadius: 10,
      backgroundPosition: "0 -200%",
      backgroundSize: "1400% 400%",
    },
    container: {
      overflow: "hidden",
      position: "relative",
    },
    cards: {
      width: 100,
      height: 140,
      borderRadius: 5,
      backgroundSize: "1400% 400%",
    },
    selected: {
      boxShadow: "0 0 5px blue",
      marginTop: 0,
    },
    handCard: {
      marginLeft: -30,
    },
    cant: {
      position: "absolute",
      display: "flex",
      top: 100,
      zIndex: 1000,
      textShadow:
        "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 2px 2px 4px #fff",
      color: "black",
      fontWeight: 700,
      justifyContent: "center",
      width: "100%",
    },
    empty: {
      width: 100,
      height: 140,
      borderRadius: 10,
      backgroundPosition: "0 -200%",
      backgroundSize: "1400% 400%",
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
      flexDirection: "row",
      paddingLeft: 0,
      justifyContent: "flex-end",
    },
    text: {
      transform: "rotate(270deg)",
      marginBottom: 10,
    },
  },
  discardDeck: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      paddingLeft: 0,
      justifyContent: "flex-end",
    },
    text: {
      transform: "rotate(270deg)",
    },
  },
  enemiesDeck: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      paddingLeft: 0,
      justifyContent: "flex-end",
    },
    text: {
      transform: "rotate(270deg)",
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
    },
  },
  history: {
    dialog: {
      height: 300,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    badge: {
      paddingTop: 7,
      paddingBottom: 7,
    },
  },
  stat: {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    titleHp: {
      textAlign: "center",
      color: "#804d4d",
      fontSize: '2vw'
    },
    titleAttack: {
      textAlign: "center",
      color: "#604b45",
      fontSize: '2vw'
    },
    leftNumber: {
      textAlign: "left",
    },
    rightNumber: {
      textAlign: "right",
    },
  },
  number: {
    image: {
      width: "4vw",
      height: "6vw",
      backgroundSize: "500% 200%",
    },
    left: {
      display: "flex",
      justifyContent: "flex-end",
    },
    center: {
      display: "flex",
      justifyContent: "center",
    },
  },
};
