import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, TextField } from "@mui/material";

import { authorizationState } from "@recoil/Atom";

const Login = () => {
  interface IUserAuth {
    email: string;
    password: string;
  }

  const setAuthToken = useSetRecoilState(authorizationState);

  const initialValues = { email: "", password: "" };

  const onSubmit = async (value: IUserAuth) => {
    const { data } = await axios.post("http://localhost:3000/auth/login", value);

    setAuthToken(data);
  };

  const formik = useFormik({ initialValues, onSubmit });

  return (
    <Box>
      <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <TextField
          name="email"
          label="user"
          type="email"
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
        <LoadingButton variant="outlined" type="submit">
          Submit
        </LoadingButton>
      </Box>
      <Link to="/">home</Link>
    </Box>
  );
};

export default Login;
