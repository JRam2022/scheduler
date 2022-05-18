import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
   console.log(props)

   if (props.confirm) {
      buttonClass += " button--confirm";
   }

   if (props.danger) {
      buttonClass += " button--danger";
   }



   return <button disabled={props.disabled} onClick={props.onClick} className={buttonClass}>{props.children}</button>;
}
