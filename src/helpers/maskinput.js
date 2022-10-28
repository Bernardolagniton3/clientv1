import React from "react";

export const idMask = (e) => {
 e.target.maxLength = 9;
  let value = e.target.value;
  value = value.replace(/\D/g,"");
  value = value.replace(/^(\d{8})(\d)/,"$1-$2");
  e.target.value = value;
  return e;
}