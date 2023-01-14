export interface RouterState {
  location: Location;
  history: PosibleRoute[];
  historyPosition: number;
}

export enum PosibleRoute {
  ROOT = "/",
  HOME = "/home",
  GAME = "/game",
  CHOICE = "/choice",
}

export interface Location {
  pathname: PosibleRoute;
  search: string;
  hash: string;
  state: any;
}

export const initialRouterState: RouterState = {
  location: {
    pathname: PosibleRoute.CHOICE,
    search: "",
    hash: "",
    state: null,
  },
  history: [PosibleRoute.CHOICE],
  historyPosition: 0,
};
