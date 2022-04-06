import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AppDatePicker from './AppDatePicker';
import { useForm } from 'react-hook-form';

const App = () => {
  const { control } = useForm();
  return (<div>Hi there, I'm React from Webpack 5.
    <AppDatePicker control={control} label={'Test'} name={'Hennes'} default={new Date()} />
  </div>);
};

ReactDOM.render(<App />, document.getElementById('app'));
