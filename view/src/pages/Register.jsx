import styled from "styled-components";
import { mobile } from "../responsive";
import { Formik } from "formik";
import moment from 'moment'
import request from "../utils/Request";
import { toast } from 'react-toastify';
import slide from '../images/slide.png'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${slide})
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

  // const formik = useFormik({
  //   initialValues: {},
  //   validate: (values) => {
  //     const errors = {};
  //     values.Godziny_pracy?.forEach((x, index) => {
  //       if (!x.from || !x.to)
  //         errors['Godziny_pracy_' + index] = 'Uzupełnij godziny pracy.'
  //       if (moment(x.from).isAfter(x.to, 'hours'))
  //         errors['Godziny_pracy_' + index] = 'Data zakończnia nie może być wcześniej niż data rozpoczęcie.'
  //     })
  //     return errors;
  //   },
  //   onSubmit: async (values) => {
  //     formik.validateForm();
  //     request(`/login`, values)

  //   },
  // })

  return (
    <Container>
      <Wrapper>
        <Title>STWÓRZ NOWE KONTO</Title>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            toast.promise(
              request(`/user/register`, values),
              {
                pending: 'Promise is pending',
                success: {
                  render({ data }) {
                    window.location.href = '/login'
                    return `${data.msg}`
                  }
                },
                error: {
                  render({ data }) {
                    return `${data[0]}`
                  }
                },
              }
            )
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              {/* <Input placeholder="name" />
              <Input placeholder="last name" />
              <Input placeholder="username" />

              <Input placeholder="password" />
              <Input placeholder="confirm password" /> */}
              <Input
                placeholder="Imie"
                type="name"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              /><Input
                placeholder="Nazwisko"
                // type="email"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
              /><Input
                placeholder="Login"
                type="login"
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
              /><Input
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              /><Input
                placeholder="Hasło"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              /><Input
                placeholder="Powtórz hasło"
                type="password"
                name="repeatPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reapeatPassword}
              />
              <Agreement>
                Tworząc konto akceptujesz naszą <b>POLITYKĘ PRYWATNOŚCI</b>.
              </Agreement>
              <Button>STWÓRZ</Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Register;
