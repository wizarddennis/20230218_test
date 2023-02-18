import { useState, useRef } from "react";
import styled from "styled-components";

const todoList = [
  { id: 1, text: "컴포넌트 만들기", done: false },
  { id: 2, text: "상태 관리하기", done: false },
  { id: 3, text: "배열 렌더링하기", done: false },
];

function TodoList() {
  const [todos, setTodos] = useState(todoList); // todo 목록 관리하기
  const [input, setInput] = useState(""); // input 만들기
  const [today, setToday] = useState("2023년 02월 18일");

  const nextId = useRef(todoList.length); //
  const inputRef = useRef();

  // input 태그에 값을 타이핑하면 반영시키는 핸들러
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === "") return;

    setTodos(
      todos.concat([{ id: nextId.current++, text: input, done: false }])
    );

    setInput("");
    inputRef.current.focus();
  };

  const handleRemove = (id) => {
    if (window.confirm("삭제하시겠습니까????"));
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //  리스트를 클릭시 done(완료여부)를 반전시킨다. 그러나, 화면상에 취소선을 넣는건 아니다.
  //  다른 곳에서
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo;
      })
    );
  };

  return (
    <div>
      <div>
        <h1>오늘 할 일</h1>
        <h3>{today}</h3>
      </div>
      <Container>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.done && "line-through",
                userSelect: "none",
              }}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.text}{" "}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(todo.id);
                }}
              >
                {" "}
                할일삭제{" "}
              </button>
            </li>
          ))}
        </ul>
      </Container>
      <Container>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInput}
            value={input}
            ref={inputRef}
          />
          <button>새로운 할일 등록하셔유~~</button>
        </form>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  /* align-items: center; */
  border: 1px solid black;
  width: 400px;
`;

export default TodoList;
