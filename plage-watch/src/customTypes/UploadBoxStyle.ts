import { Color, Style } from "./CommonTypes"

export type UploadBoxBorder = {
    borderColor: Color 
}

export type UploadBaseStyle = {
    flex: number;
  display: Style;
  flexDirection: "column" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column-reverse" | "row" | "row-reverse" | undefined;
  alignItems: Style;
  padding: Style;
  borderWidth:number;
  borderRadius: number;
  borderColor: Color;
  borderStyle: Style;
  backgroundColor: Color;
  color: Color;
  outline: Style;
  transition: Style;
}

export type LabelStyles = {
    fontSize: Style;
    fontFamily: Style;
}