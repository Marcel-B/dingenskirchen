import { Table, TableBody, Grid, Paper, TableContainer, Typography, TableRow, TableCell } from '@mui/material';
import Calendar from 'react-calendar';
import { useStore } from '../../../app/stores/store';

const ActivityFilters = () => {
  const { buchungStore } = useStore();
  const formatBetrag = (value: number | null) => {
    if (!value) return value;
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };
  return (
    <div style={{ position: 'fixed', width: '28%' }}>
      <Typography color="primary" variant='h3' gutterBottom>Übersicht</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 80 }}>
          <TableBody>
            <TableRow>
              <TableCell>Einnahmen monatlich</TableCell>
              <TableCell>{formatBetrag(buchungStore.einnahmenGesamt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ausgaben monatlich</TableCell>
              <TableCell>{formatBetrag(buchungStore.ausgabenNurMonatlich)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ausgaben monatlich verrechnet</TableCell>
              <TableCell>{formatBetrag(buchungStore.ausgabenGesamt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rest monatlich</TableCell>
              <TableCell>{formatBetrag(buchungStore.restMonatlich)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rest monatlich verrechnet</TableCell>
              <TableCell>{formatBetrag(buchungStore.restMonatlichVerrechnet)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Calendar />
    </div >
  );
};
export default ActivityFilters;
