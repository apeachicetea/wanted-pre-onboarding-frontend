import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Atodo = styled.li``;

const Label = styled.label``;

const Checkbox = styled.input``;

const ModifyInput = styled.input``;

const Text = styled.span`
  margin: 0px 5px 0px 3px;
`;

const ModifyBtn = styled.button`
  margin-right: 5px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
`;

const SummitBtn = styled(ModifyBtn)`
  margin-left: 5px;
`;

const CancelBtn = styled(DeleteBtn)``;

function Todo({ todo, baseURL, accessToken }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [isModified, setIsModified] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isCompleted !== todo.isCompleted) {
      updateTodo();
    }
  }, [isCompleted]);

  const updateTodo = async () => {
    console.log(input);
    try {
      const response = await axios.put(
        `${baseURL}/todos/${todo.id}`,
        { todo: input || todo.todo, isCompleted },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setInput("");
      setIsModified(false);
      console.log(response);
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${baseURL}/todos/${todo.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error sending DELETE request:", error);
    }
  };

  const handleClick = () => {
    setIsModified(!isModified);
  };

  const handleChange = (e) => {
    setIsCompleted(e.target.checked);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      updateTodo();
    }
  };

  return (
    <Fragment>
      {isModified ? (
        <Atodo>
          <ModifyInput
            data-testid="modify-input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <SummitBtn data-testid="submit-button" onClick={updateTodo}>
            제출
          </SummitBtn>
          <CancelBtn data-testid="cancel-button" onClick={handleClick}>
            취소
          </CancelBtn>
        </Atodo>
      ) : (
        <Atodo>
          <Label>
            <Checkbox
              type="checkbox"
              checked={isCompleted}
              onChange={handleChange}
            />
            <Text>{todo.todo}</Text>
          </Label>
          <ModifyBtn data-testid="modify-button" onClick={handleClick}>
            수정
          </ModifyBtn>
          <DeleteBtn data-testid="delete-button" onClick={deleteTodo}>
            삭제
          </DeleteBtn>
        </Atodo>
      )}
    </Fragment>
  );
}

export default Todo;
