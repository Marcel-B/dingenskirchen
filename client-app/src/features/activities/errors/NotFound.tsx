import React from "react";
import {Button, Header, Icon, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name={`search`}/>
                    Oops - we've looked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to={`/activities`} primary>
                    Zur Buchungen Seite
                </Button>
            </Segment.Inline>
        </Segment>
    )
}

export default NotFound;