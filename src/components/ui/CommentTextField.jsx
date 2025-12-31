import { InputLabel, TextField } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const CommentTextField = () => {
  const { inputLabelStyle } = useContext(AppContext);

  return (
    <>
      <InputLabel htmlFor="comment" sx={inputLabelStyle}>
        Optional Comment
      </InputLabel>
      <TextField
        id="comment"
        name="comment"
        multiline
        maxRows={4}
        size="small"
      />
    </>
  );
};

export default CommentTextField;
