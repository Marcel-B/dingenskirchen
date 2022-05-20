import React from 'react';
import {useForm} from 'react-hook-form';
import {
    Button,
    Card,
    Divider,
    Typography
} from '@mui/material';
import DaTextInput from 'ts-control/DaTextInput';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
    TextInputComponent,
    AquariumFormValues,
} from 'shared-types';
import {useAppDispatch} from '../../store/store';
import {createAquariumAsync} from '../../store/aquariumSlice';

const AppTextInput = DaTextInput as TextInputComponent;

const schema = yup.object({
    name: yup.string().required('benötigt'),
    liter: yup.number().typeError('muss eine Zahl sein').positive('muss positiv sein').integer('muss eine natürliche Zahl sein').required('benötigt')
}).required();

const NeuesAquariumForm = () => {
    const dispatch = useAppDispatch();
    const {control, handleSubmit, reset} = useForm<AquariumFormValues>({resolver: yupResolver(schema)});

    const onSubmit = (data: AquariumFormValues) => {
        dispatch(createAquariumAsync(data));
        reset({});
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card style={{padding: '2rem'}}>
                    <Typography variant='h5'>Neues Aquarium</Typography>
                    <Divider orientation='horizontal'/>
                    <br/>
                    <AppTextInput control={control} label='Name' type='text' default={''} name='name'/>
                    <AppTextInput control={control} label='Liter' type='number' default={''} name='liter'/>
                    <br/>
                    <br/>
                    <Button variant='contained' type='submit'>Senden</Button>
                </Card>
            </form>
        </>
    );
};

export default NeuesAquariumForm;
