import React from "react";
import "./styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";


export default function Appointment(props) {
  return (
  <arcticle className="appointment">
    <Header time={props.time}/>
      {props.interview ? <Show interviewer={props.interview.interviewer}student={props.interview.student}/> : <Empty/>}
  </arcticle>
  );
}