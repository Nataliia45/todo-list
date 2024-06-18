// import { Field, Form, Formik} from "formik";
// import "./index.scss";
// import * as Yup from 'yup';


// const SignInSchema = Yup.object({
//     login: Yup.string()
//       .min(2, 'Must be longer than 2 characters')
//       .max(15, 'Nice try, nobody has a login that long')
//       .matches(/^[A-Za-z]{2,15}$/, 'The login is wrong')
//       .required('Required'),
//    });

// export default function SignInForm(){
// return(
//     <Formik
//         initialValues={{
//             login: "",
//         }}
//         validationSchema={SignInSchema}
//         onSubmit={values => {
//          console.log(values);
//         }}
//     >
//         {({errors}) =>{
//         return(
//             <Form>
//                 {errors.login ? <div className="error">{errors.login}</div> : null}
//                 <Field
//                     name="login"
//                     placeholder="Login"
//                 />

//                 <input type="submit" value="Sign in"/>
//             </Form>
//         );
//         }}
//     </Formik>
    
// );
// }