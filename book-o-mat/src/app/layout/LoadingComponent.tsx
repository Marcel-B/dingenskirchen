
interface Props {
  inverted?: boolean;
  content?: string;
}

export const LoadingComponent = ({
  inverted = true,
  content = 'Haushaltsbuch lädt...',
}: Props) => {
  return (<></>
    // <Dimmer active={true} inverted={inverted}>
    //   <Loader content={content} />
    // </Dimmer>
  );
};
