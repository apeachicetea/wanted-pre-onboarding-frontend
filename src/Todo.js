import styled from "styled-components";

const Atodo = styled.li``;

const Label = styled.label``;

const Checkbox = styled.input``;

const Text = styled.span``;

const ModifyBtn = styled.button``;

const DeleteBtn = styled.button``;

function Todo({ todo }) {

  return (
    <Atodo>
      <Label>
        <Checkbox type="checkbox" onClick={} />
        <Text>{todo.todo}</Text>
      </Label>
      <ModifyBtn data-testid="modify-button">수정</ModifyBtn>
      <DeleteBtn data-testid="delete-button">삭제</DeleteBtn>
    </Atodo>
  );
}

export default Todo;
