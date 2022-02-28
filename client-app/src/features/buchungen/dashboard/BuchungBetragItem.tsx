import { List } from "semantic-ui-react";
import { validateLocaleAndSetLanguage } from "typescript";

interface Props {
    betrag: number;
    intervall: number;
}

const BuchungBetragItem = ({betrag, intervall}: Props) => {
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(value);
}

const conv = (betrag: number, intervall: number) => {
    switch(intervall){
                case 3:
                    return betrag * 3;
                    case 4:
                        return betrag * 6;
                        case 5:
                            return betrag * 12;
                            default: return betrag;
    }
}

return (
<>
<List>
<List.Item>
        {formatCurrency(conv(betrag, intervall))}
    </List.Item>
    {intervall > 2   ? <List.Item as={'small'}>
        ({formatCurrency(betrag)})
    </List.Item> : <></> }
</List>
</>
);
}

export default BuchungBetragItem;