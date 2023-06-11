import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, getIn } from 'formik'
import * as Yup from 'yup'
import { userService } from '../services/user.service'
import { signup } from '../store/user.actions.js'
import { languages } from '../constants/constants'

export function BecomeSeller() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    async function onSubmit(credentials) {
        try {
            console.log('credentials: ', credentials)
            const user = await signup(credentials)
            navigate(`/user/${user._id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const userSellerSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Required'),
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
        profession: Yup.string()
            .required('Required')
    })

    const sellerSchema = Yup.object().shape({
        profession: Yup.string()
            .required('Required')
    })


    function CustomInput(props) {
        return <input id="outlined-basic" label="Outlined" variant="outlined" {...props} />
    }

    const userFields = [{
        field: 'fullname',
        label: 'Full name'
    },
    {
        field: 'username',
        label: 'Username'
    },
    {
        field: 'password',
        label: 'Password'
    }
    ]


    return (
        <section className="become-seller main-layout full">

            <Formik
                initialValues={user || userService.getEmptyUser}
                validationSchema={user ? sellerSchema : userSellerSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {({ errors, touched, dirty, setFieldValue }) => (
                    <Form className='formik become-seller-form'>
                        <h2>Become a Seller</h2>

                        {!user &&

                            userFields.map((userField) =>
                                <label htmlFor={userField.field} key={userField.field}>{userField.label}
                                    <div>
                                        <Field as={CustomInput} name={userField.field} />
                                        {errors[userField.field] && touched[userField.field] && <div className="error">{errors[userField.field]}</div>}
                                    </div>
                                </label>

                            )
                        }

                        <label htmlFor='profession' >Profession
                            <div>
                                <Field as={CustomInput} name='profession' />
                                {errors['profession'] && touched['profession'] && <div className="error">{errors['profession']}</div>}
                            </div>
                        </label>

                        <label htmlFor='about'>Description
                            <div>
                                <Field as={CustomInput} name='about' />
                                {errors['about'] && touched['about'] && <div className="error">{errors['about']}</div>}
                            </div>
                        </label>
                   
                        <label htmlFor='from'>Country
                            <div>
                                <Field as={CustomInput} name='from' />
                                {errors['from'] && touched['from'] && <div className="error">{errors['from']}</div>}
                            </div>
                        </label>

                        <div className="language-select">
                            <h4>Languages</h4>
                            <div className='language-checkboxes'>
                                {languages.map(language =>
                                    <label key={language}>
                                        <Field type="checkbox" name="languages" value={language} />
                                        {language}
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="btns-container">
                            <button className='back-btn' onClick={() => navigate('/')}>Back</button>
                            <button type="submit">Become a Seller</button>
                        </div>

                    </Form>)}
            </Formik>
        </section>
    )
}