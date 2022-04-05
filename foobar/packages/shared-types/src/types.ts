export type AppLink = {
  name: string;
  target: string;
};

export type HeaderComponent = React.FunctionComponent<{appLinks: AppLink[]}>;
export type NeueMessungComponent = React.FunctionComponent;
