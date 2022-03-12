import {Button, Header, Label} from 'semantic-ui-react';
import {ErrorMessage, Form, Formik} from 'formik';

import MyTextInput from '../../app/common/form/MyTextInput';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import {useStore} from '../../app/stores/store';

const LoginForm = () => {
    const {userStore} = useStore();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) =>
                userStore
                    .login(values)
                    .then(() => navigate('/app/buchungen'))
                    .catch((error) => setErrors({error: 'Invalid email or password'}))
            }>
            {({handleSubmit, isSubmitting, errors}) => (
                <Form
                    className={'ui form'}
                    onSubmit={handleSubmit}
                    autoComplete={'off'}>
                    <Header
                        as={'h2'}
                        content={'Einloggen Haushaltsbuch'}
                        color={'teal'}
                        textAlign={'center'}
                    />
                    <MyTextInput placeholder={'Email'} name={'email'}/>
                    <MyTextInput
                        placeholder={'Password'}
                        name={'password'}
                        type={'password'}
                    />
                    <ErrorMessage
                        name={'error'}
                        render={() => (
                            <Label
                                style={{marginBottom: 10}}
                                basic
                                color={'red'}
                                content={errors.error}
                            />
                        )}
                    />
                    <Button
                        loading={isSubmitting}
                        positive
                        content={'Login'}
                        type={'submit'}
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
};

export default observer(LoginForm);
