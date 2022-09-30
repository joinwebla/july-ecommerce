import { useState } from "react"
import { loginApiCall } from "../apiCalls"

export const LoginPage = () => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (key, value) => {
        // key - dynamic key - must be one value out of [email or password]
        // value - user typed value
        setValues({
            ...values,
            [key]: value
        })
    }


    const handleSubmit = async () => {
        // TODO - Need to add data validation
        try {
            const response = await loginApiCall({
                email: values.email,
                password: values.password
            });

            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem("cartId", response.data.cart_id)
            window.location.href = "/productfeed"
        } catch (error) {
            alert("Unable to login")
        }
    }

    return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
            <div style={{width: 500, padding: 20, border: "1px solid"}}>
               
                <div class="form-group" style={{marginBottom: 20}}>
                    <label>Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={(event) => {handleOnChange("email", event.target.value)}}
                    />
                </div>

                <div class="form-group" style={{marginBottom: 20}}>
                    <label>Password</label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        value={values.password}
                        onChange={(event) => {handleOnChange("password", event.target.value)}}
                    />
                </div>

                <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Login</button>
                <div style={{marginTop: 10}}>
                    <p>Don't have an account? <a href="/signup">Signup Here</a></p>
                </div>
            </div>
        </div>
    )
}