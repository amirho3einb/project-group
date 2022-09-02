import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authorizationState } from "../../Recoil/Atom";

const Login = () => {
  interface IUserAuth {
    email: string;
    password: string;
  }

  const setAuth = useSetRecoilState(authorizationState);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (value: IUserAuth) => {
    const { data } = await axios.post(
      "http://localhost:3000/auth/login",
      value
    );
    console.log(data);
    setAuth(data);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <Box>
      <Box
        component={"form"}
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <TextField
          name="email"
          label="user"
          autoComplete="current-password"
          onChange={formik.handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
        />
        <LoadingButton loading={false} variant="outlined" type="submit">
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Login;
