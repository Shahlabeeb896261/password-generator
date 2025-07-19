
import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css"

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const btnRef = useRef(null);

  const copyToClipBoard = useCallback(() => {
    btnRef.current?.select();
    window.navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    })
    alert("Password Copied to clipboard");
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "~`!@#$%^&*()_-+=";
    }
    for (let i = 1; i < length + 1; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>Password Generator</h1>
        </div>
        <div className="input">
          <input ref={btnRef} className="inputValue" type="text" readOnly value={password} placeholder="Password" />
          <div className="copyBtn" onClick={copyToClipBoard}>{copied? "Copied": "Copy"}</div>
        </div>
        <div className="bottom">
          <div className="range">
            <input onChange={(e) => setLength(parseInt(e.target.value))} type="range" min={8} max={100} value={length} />
            <label>Length : {length}</label>
          </div>
          <div className="number">
            <input onChange={(e) => setNumberAllowed(e.target.checked)} type="checkbox" checked={numberAllowed} />
            <label>Numbers</label>
          </div>
          <div className="char">
            <input onChange={(e) => setCharAllowed(e.target.checked)} checked={charAllowed} type="checkbox" />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;