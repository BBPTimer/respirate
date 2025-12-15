import { TextField } from "@mui/material";

const CommentTextField = () => {
  return (
    <TextField
      name="comment"
      label="Optional Comment"
      multiline
      maxRows={4}
      size="small"
    />
  );
};

export default CommentTextField;
