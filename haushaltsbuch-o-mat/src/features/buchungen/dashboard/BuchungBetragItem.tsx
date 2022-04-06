import {Stack, Typography} from "@mui/material";

interface Props {
  betrag: number;
  intervall: number;
}

const BuchungBetragItem = ({ betrag, intervall }: Props) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const conv = (betrag: number, intervall: number) => {
    switch (intervall) {
      case 3:
        return betrag * 3;
      case 4:
        return betrag * 6;
      case 5:
        return betrag * 12;
      default:
        return betrag;
    }
  };

  return (
    <>
      <Stack direction='column'>
        <Typography variant='h6'>
          {formatCurrency(conv(betrag, intervall))}
        </Typography>
        {intervall > 2 ? (<Typography variant='caption'>
              ({formatCurrency(betrag)})
            </Typography>
          )
          : (<></>)}
      </Stack>
    </>
  );
};

export default BuchungBetragItem;
