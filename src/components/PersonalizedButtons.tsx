import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { blue, purple } from "@mui/material/colors";

export const PersonalizedButtons = styled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: "Catamaran",
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: blue[300],
  "&:hover": {
    backgroundColor: blue[800],
  },
  marginTop: "30px",
}));
