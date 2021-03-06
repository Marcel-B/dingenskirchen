import {Formik} from "formik";

export const NeueBuchung = () => {
    return (
        <div>
            <p>
                Neue Buchung
            </p>
            <Formik initialValues={{buchung: '', betrag: 0}}
                    validate={values => {
                        const errors = {};
                        if (!values.buchung) {
                            errors.buchung = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            fetch('http://localhost:5044/haushaltsbuch/posten', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(values),
                            }).then(res => {
                                console.log('Res', res);
                                setSubmitting(false);
                            }).catch(reason => console.error(reason))
                        }, 400);
                    }}>{({
                             values,
                             errors,
                             touched,
                             handleChange,
                             handleSubmit
                         }) => (
                <form onSubmit={handleSubmit}>
                    <label>Buchung</label>
                    <input type="text" name="buchung" onChange={handleChange} value={values.buchung}/>
                    {errors.buchung && touched.buchung && errors.buchung}
                    <label>Betrag</label>
                    <input type="number" name="betrag" onChange={handleChange} value={values.betrag}/>
                    <label>Intervall</label>
                    <input type="text" name="intervall" onChange={handleChange} value={values.intervall}/>
                    <button type="submit">Submit</button>
                </form>)}
            </Formik>
        </div>
    )
}
