import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {
  const hiFn = () => {
    console.log("Hello");
    // 함수 안에 return문 == cleanup Funtion
    return () => {
      byeFn();
    };
  };

  const byeFn = () => {
    console.log("Bye");
  };
  useEffect(hiFn, []);
  return <h1>Hello</h1>;
}

function PracReact() {
  // useState : state값이 변동될 때마다 계속 렌더링
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);

  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);
  const onShowing = () => setShowing((prev) => !prev);

  // useEffect : 렌더링이 될 때 딱 1번만 실행하는 함수
  useEffect(() => {
    console.log("I run only once!");
  }, []);
  useEffect(() => {
    console.log("Search Keyword : ", keyword);
  }, [keyword]);
  useEffect(() => {
    console.log("How many i Clicked : ", counter);
  }, [counter]);
  return (
    <div>
      <input
        value={keyword}
        type="text"
        onChange={onChange}
        placeholder="Search Here"
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click Me</button>
      <br />
      <br />
      <br />
      {showing ? <Hello /> : null}
      <button onClick={onShowing}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default PracReact;
