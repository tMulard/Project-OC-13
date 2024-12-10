import './Form.css'

function Form() {
    
    return (
        <>
            <form id="connect-form">
                <label for="mail">Email: </label>
                <input type="text" name="email" id="mail" placeholder="example@mail.com" />
                <label for="password">Password: </label>
                <input type="text" name="password" id="password" placeholder="12345678" />
                <button type="submit">Connect</button>
            </form>  
        </>
    )
}

export default Form