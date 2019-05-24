import styled from "../../theme";
import { IDayProps } from "./types";

export const NormalDay = styled("td")<IDayProps>`
  height: 40px;
  width: 40px;

  text-align: center;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  border-radius: ${props => props.theme.daysRound};
  color: ${props =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.daysColor};
  background-color: ${props =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.daysBackColor};

  //@media (min-width: 768px) {
  //  height: 45px;
  //  min-width: 40px;
  //}
`;

export const HolidayDay = styled(NormalDay)`
  color: ${props =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.holidaysColor};
  background-color: ${props =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.holidaysBackColor};
`;

export const StartEndRangeDay = styled(NormalDay)<IDayProps>`
  color: ${props => props.theme[`${props.startEndRange.status}Color`]};
  background-color: ${props =>
    props.theme[`${props.startEndRange.status}BackColor`]};
  border-radius: ${props =>
    props.startEndRange.status === "continueRange" ? 0 : props.theme.daysRound};
  z-index: ${props => props.startEndRange.status === "continueRange" && 100};
  ${props =>
    props.startEndRange.status === "startRange" &&
    `
			&:after {
				content: "";
				display: block;
				width: 25px;
				height: 45px;
				position: absolute;
				top: 45px;
				background-color: ${props.theme.continueRangeBackColor}
				transform: translate3d(-25px, -45px, -1px);
			}
		`};
  ${props =>
    props.startEndRange.status === "endRange" &&
    `
			&:after {
				content: "";
				display: block;
				width: 25px;
				height: 45px;
				position: absolute;
				top: 45px;
				background-color: ${props.theme.continueRangeBackColor}
				transform: translate3d(0px, -45px, -1px);
			}
		`};
`;