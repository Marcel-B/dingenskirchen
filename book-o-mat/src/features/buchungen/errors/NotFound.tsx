import {useNavigate} from "react-router-dom";
import React from "react";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <></>
    // <Container>
    //   <Card>
    //     <CardContent>
    //       <Search fontSize='large'/>
    //       <Typography variant='h3'>Oops - we've looked everywhere and could not find this.</Typography>
    //     </CardContent>
    //     <CardActions>
    //       <Button size='small' onClick={() => navigate(`/app/buchungen`)}>
    //         Zur Buchungen Seite
    //       </Button>
    //     </CardActions>
    //   </Card>
    // </Container>
  );
};

export default NotFound;
