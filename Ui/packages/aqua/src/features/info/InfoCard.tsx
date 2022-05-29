import { Grid, Paper, Typography } from "@mui/material";

const InfoCard = () => {
  return (
    <Paper sx={{
      p: 2,
      mt: 2,
    }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">
            Nitrat
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            10 - 25 mg/l
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            Phosphat
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            0,1 - 1 mg/l
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            Kalium
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            5 - 10 mg/l
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            Eisen
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            0,05 - 0,1 mg/l
          </Typography>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default InfoCard;