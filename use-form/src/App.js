import './App.css';
import {useForm} from "react-hook-form"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const schema = yup.object({
    firstname: yup
        .string()
        .required()
    ,
    age: yup.number().positive().integer().required(),
    password: yup
        .string()
        .required("Please Enter your password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*])(?=.{8,})/g,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )

    ,
}).required();

function App() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"

    });


    const onSubmit = (data) => {
        console.log(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                First Name: <br/>
                <input {...register("firstName")} />
                <p>{errors.firstName?.message}</p>

            </label>

            <br/>

            <label>
                Last name: <br/>
                <input type="text"
                       {...register('lastname',
                           {
                               required: {
                                   value: true,
                                   message: "Text smth"
                               },
                               minLength: {
                                   value: 5,
                                   message: "Need more than 5 sybomls"
                               }
                           })}
                />
                <div>
                    {errors?.lastname && <p style={{color: "red"}}>{errors?.lastname.message || "error"}</p>}

                </div>
            </label>

            <label>
                Age: <br/>
                <input {...register("age")} />
                <p>{errors.age?.message}</p>

            </label>

            {/*<label>*/}
            {/*    Password: <br/>*/}
            {/*    <input type="password"*/}
            {/*           {...register('password',*/}
            {/*               {*/}
            {/*                   required: {*/}
            {/*                       value: true,*/}
            {/*                       message: "Text smth"*/}
            {/*                   },*/}
            {/*                   minLength: {*/}
            {/*                       value: 8,*/}
            {/*                       message: "Need more than 8 sybomls"*/}
            {/*                   },*/}
            {/*                   pattern: {*/}
            {/*                       value: "[A-Z]*[a-z]*[0-9]*",*/}
            {/*                       message: "Incorrect letters"*/}
            {/*                   }*/}
            {/*               })}*/}
            {/*    />*/}
            {/*    <div>*/}
            {/*        {errors?.password && <p style={{color: "red"}}>{errors?.password.message || "error"}</p>}*/}

            {/*    </div>*/}
            {/*</label>*/}

            <label>
                Password: <br/>
                <input {...register("password")} />
                <p>{errors.password?.message}</p>
            </label>

            <label>
                Email: <br/>
                <input type="email"
                       {...register('email',
                           {})}
                />
                <div>
                    {errors?.email && <p style={{color: "red"}}>{errors?.email.message || "error"}</p>}

                </div>
            </label>


            <input type="submit"/>
        </form>
    );
}

export default App;
