import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatErrors } from 'ts-loader/dist/utils';
import { format } from 'date-fns';

const MessungList = () => {
  const [data, setData] = useState<{_id: string, zeitpunkt: string, typ: string, wert: number}[]>([])

  useEffect(() => {
    axios.get(`http://localhost:8080/messungen`)
      .then(response => {
        setData(response.data);
      });
  }, []);

  const getDate = (date: string) => {
    return format(new Date(date), 'dd.MM.yyyy');
  }
  return (
    <>
      <h1>Werte</h1>
      <ul>
        {data.map(d => <li key={d._id}>{getDate(d.zeitpunkt)} - {d.typ} - {d.wert}</li>)}
      </ul>
    </>
  );
};
export default MessungList;