import React from "react";
import { driverColor } from "../styles/colors";
export default function(index: number) {
  return driverColor[index % driverColor.length];
}
