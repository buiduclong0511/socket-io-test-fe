import logo from './logo.svg';
import { io } from "socket.io-client";
import MessageBox from './MessageBox';
import { useEffect, useState } from 'react';
import FormUser from './FormUser';

export const socket = io("https://sockett-io-test.herokuapp.com");

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  
  const handleSetUser = () => {
    socket.emit("register", name);
  };

  useEffect(() => {
    socket.on("registerFailure", (data) => {
      alert(data);
    });
    socket.on("registerSuccessful", (data) => {
      setUser({
        name: data.name,
        socketId: data.socketId
      })
    })
  }, []);
  const handleChangeName = (e) => {
    // console.log(e);
    setName(e.target.value);
  };

  return (
    <div className="App">
      {user ? (
        <MessageBox user={user}/>
      ) : (
        <FormUser
          name={name}
          onSetUser={handleSetUser}
          onChangeName={handleChangeName}
        />
      )}
    </div>
  );
}

export default App;
