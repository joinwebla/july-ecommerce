import { useEffect, useState } from "react"
import { object, string, number, date, InferType } from 'yup';
import { signUpApiCall } from "../apiCalls";

let userSchema = object({
  name: string().min(2).max(50).required(),
  email: string().email().required(),
  password: string().min(8).max(15).required(),
  confirmPassword: string().min(8).max(15).required().test('confirm-password', 'Passwords not matching', function(confirmPassword){
    return confirmPassword == this.parent.password;
  }
),
});


export const SignupPage = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState([]);


    const handleChange = (key, value) => {
        setValues({
            ...values,
            [key]: value
        })
    }


    const handleSubmit = () => {
        userSchema.validate(values, {abortEarly: false})
        .then((res) => {
            setErrors([])
            console.log(res);
            // Signup api call 

            signUpApiCall({
                name: values.name,
                email: values.email,
                password: values.password
            }).then((response) => {
                if(response.data.success){
                    window.location.href = "/login"
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            setErrors(err.errors)
        })
    }


    return(
        <div style={{display: 'flex', flexDirection: 'column',  alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
            <div style={{width: 500, padding: 20, border: "1px solid"}}>
                
                <div class="form-group" style={{marginBottom: 20}}>
                    <label>Name</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your name"
                        value={values.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                    />
                </div>

                <div class="form-group" style={{marginBottom: 20}}>
                    <label>Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={(event) => { 
                            const val = event.target.value;
                            handleChange('email', val)
                        }}
                    />
                </div>
                
                <div class="form-group" style={{marginBottom: 20}}>
                    <label>Password</label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        value={values.password}
                        onChange={(event) => { 
                            const val = event.target.value;
                            handleChange('password', val)
                        }}
                    />
                </div>
                
                <div class="form-group" style={{marginBottom: 20}}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={(event) => { 
                            const val = event.target.value;
                            handleChange('confirmPassword', val)
                        }}
                    />
                </div>

                {
                    errors.map((err, index) => {
                        return <p ky={index} className="text-danger">{err}</p>
                    })
                }
                
                <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Signup</button>
                
                <div style={{marginTop: 10}}>
                    <p>Already has an account? <a href="/login">Login Here</a></p>
                </div>
            </div>
        </div>
    )
}