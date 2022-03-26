import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MessungList from './MessungList';

interface Messung {
  name: string;
  wert: string;
  datum: Date;
}


const App = () => {
  const submitData = (data: Messung) => {
    console.log(data);
    const messungDto = {
      wert: parseFloat(data.wert),
      typ: data.name,
    };

    axios.post(`http://localhost:8080/messungen`, messungDto);
  };
  const { handleSubmit, register, formState: { isSubmitting, isValid } } = useForm<Messung>();
  return (
    // <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div className={'container mx-auto'}>
      <MessungList/>
      <form onSubmit={handleSubmit(data => submitData(data))}>
        <p><label className='text-sm' htmlFor='name'>Name</label></p>
        <p><input id='name' defaultValue='' className='border-2 border-yellow-100 rounded' {...register('name')} /></p>
        <p><label className='text-sm' htmlFor='wert'>Wert</label></p>
        <p><input id='wert' step={'any'} className='border-2 border-black rounded' type='number'
                  defaultValue={0} {...register('wert')} /></p>
        <p><label className='text-sm' htmlFor='datum'>Datum</label></p>
        <p><input id='datum' type='date' className='border-2 border-yellow-100 rounded'
                  width={320} {...register('datum')} /></p>
        <div>
          <button className='bg-green-500 p-2 rounded'>Speichern</button>
        </div>
      </form>
    </div>
  )
    ;
};
ReactDOM.render(<App />, document.getElementById('app'));
