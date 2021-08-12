import { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "./App";

function MessageBox({
    user = null
}) {
    const [listUserOnline, setListUserOnline] = useState([]);
    const [listMessage, setListMessage] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        socket.on("thong_bao_user_online", (data) => {
            setListUserOnline(data);
        });
        socket.on("sever_gui_message", (data) => {
            setListMessage(prev => [...prev, data]);
        });
    }, []);
    
    const handleSendData = () => {
        socket.emit("client_gui_message", {
            socketId: user.socketId,
            name: user.name,
            message: message
        });
        setMessage("");
    };

    return (
        <Container>
            <div className="userOnline">
                <h3>User Online </h3>
                {listUserOnline.map((userEle, index) => {
                    if (userEle.name === user.name) {
                        return null;
                    }
                    const handleClickUser = () => {
                        socket.emit("client_gui_partner_info", userEle);
                    };
                    return (
                        <div onClick={handleClickUser} key={index} className="userItem">
                            {userEle.name}
                        </div>
                    );
                })}
            </div>
            <div className="messageBox">
                <div className="listMessage">
                    {listMessage.map(messageEle => {
                        return (
                            <div style={{ textAlign: messageEle.socketId === user.socketId ? "left" : "right" }} className="messageItem">
                                {messageEle.name}: {messageEle.message}
                            </div>
                        );
                    })}
                </div>
                <div className="inputBox">
                    <div className="input">
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <div className="btnSend">
                        <button onClick={handleSendData}>Send</button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default MessageBox;

const Container = styled.div`
    width: 600px;
    height: 400px;
    margin: 20px auto;
    border: 1px solid #000;
    display: flex;

    .userOnline {
        flex: 1;
        border-right: 1px solid #000;

        h3 {
            padding: 10px;
            border-bottom: 1px solid #000;
        }

        .userItem {
            padding: 10px;
            border-bottom: 1px solid #000;
            cursor: pointer;
        }
    }

    .messageBox {
        flex: 2;
        display: flex;
        flex-direction: column;

        .listMessage {
            flex: 1;
        }

        .inputBox {
            display: flex;

            .input {
                flex: 1;
                
                input {
                    width: 100%;
                }
            }
        }
    }
`;