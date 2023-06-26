"use client";

import React from "react";

export default function EditButton(props: { rowNum: number }) {
  return (
    <td>
      <input
        name={"selectedRow"}
        value={props.rowNum.toString()}
        type="checkbox"
      />
    </td>
  );
}
