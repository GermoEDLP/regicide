import { deck, enemies } from "../../data/cards";

export interface CardState {
  deck: Card[];
  hand: Card[];
  discard: Card[];
  field: Card[];
  enemies: {
    J: Card[];
    Q: Card[];
    K: Card[];
  };
  enemy: Card | null;
}

export enum DeckType {
  deck = "deck",
  hand = "hand",
  discard = "discard",
  enemies = "enemies",
}

export const initialCardState: CardState = {
  deck,
  hand: [],
  discard: [],
  field: [],
  enemies: {
    J: enemies.filter((card) => card.name === "J"),
    Q: enemies.filter((card) => card.name === "Q"),
    K: enemies.filter((card) => card.name === "K"),
  },
  enemy: null,
};

export interface Card {
  name: string;
  value: number;
  suit: Suit;
  hp: number;
  attack: number;
}

export type Suit = "hearts" | "diamonds" | "spades" | "clubs";
