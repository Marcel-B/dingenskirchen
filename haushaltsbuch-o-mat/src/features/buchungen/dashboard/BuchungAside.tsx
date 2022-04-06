import { Table, TableBody, Paper, TableContainer, Typography, TableRow, TableCell } from '@mui/material';
import Calendar from 'react-calendar';
import { useAppSelector } from '../../../app/stores';

const ActivityFilters = () => {
  const { einnahmenGesamt, ausgabenGesamt, ausgabenGesamtReal, restMonatlichReal, restMonatlich } = useAppSelector(state => state.buchungen);
  const formatBetrag = (value: number | null) => {
    if (!value) return value;
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };
  return (
    <div style={{ position: 'fixed', width: '28%' }}>
      <Typography color='primary' variant='h3' gutterBottom>Übersicht</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 80 }}>
          <TableBody>
            <TableRow>
              <TableCell>Einnahmen monatlich regelmäßig</TableCell>
              <TableCell>{formatBetrag(einnahmenGesamt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ausgaben monatlich regelmäßig</TableCell>
              <TableCell>{formatBetrag(ausgabenGesamt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ausgaben monatlich real</TableCell>
              <TableCell>{formatBetrag(ausgabenGesamtReal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rest monatlich</TableCell>
              <TableCell>{formatBetrag(restMonatlich)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rest monatlich real</TableCell>
              <TableCell>{formatBetrag(restMonatlichReal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Calendar />
    </div>
  );
};
export default ActivityFilters;
