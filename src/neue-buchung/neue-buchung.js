import {Formik} from "formik";

export const NeueBuchung = () => {
    return (
        <div>
            <p>
                Neue Buchung
            </p>
            <Formik initialValues={{buchung: '', betrag: 0}}

                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}>{({values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="buchung"  onChange={handleChange} value={values.buchung}/>
                    <input type="number" name="betrag"  onChange={handleChange} value={values.betrag}/>
                    <button type="submit">Submit</button>
                </form>)}
            </Formik>
        </div>
    )
}