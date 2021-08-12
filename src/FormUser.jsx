import styled from "styled-components";

function FormUser({
    name = "",
    onSetUser = () => {},
    onChangeName = () => {}
}) {
    return (
        <Container>
            <div className="formGroup">
                <label htmlFor="name">Name: </label><br />
                <input type="text" value={name} onChange={onChangeName} />
                <button onClick={onSetUser}>Submit</button>
            </div>
        </Container>
    );
}

const Container = styled.div``;

export default FormUser;