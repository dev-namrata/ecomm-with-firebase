import TextField from '@mui/material/TextField';
function InputControl(props: any) {
  return (
    <div>
      {/* {props.label && <label>{props.label}</label>} */}
      <TextField type="text" {...props} />
    </div>
  );
}

export default InputControl;
