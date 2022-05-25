import React from "react";
import "./styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const DELETE = "DELETE";
const ERROR_DELETE = "ERROR_DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    if (!name || !interviewer) {
      return
    }

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true)
    })
  }
  
  function deleteInterview() {
    transition(DELETE, true)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((error) => {
      transition(ERROR_DELETE ,true)
    })
  }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interview={props.interview}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    )}
    {mode === CONFIRM && (
      <Confirm 
        onCancel={back}
        onConfirm={deleteInterview}
      />
    )}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === DELETE && <Status message={"Deleting"}/>}
    {mode === EDIT && (
      <Form
      student={props.interview.student}
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
    />
    )}
    {mode === ERROR_SAVE && (<Error message={"Error saving"} onClose={back}/>)}
    {mode === ERROR_DELETE && (<Error message={"Error deleting"} onClose={back}/>)}
  </article>
  );
}