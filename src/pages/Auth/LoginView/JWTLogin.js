import React from "react";
//import "./jwtlogin.scss"
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
} from "@material-ui/core";
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";

const useStyles = makeStyles(() => ({
  root: {
    "& fieldset": {
      borderRadius: "25px",
    },
  },
}));
const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();

  return (
    <Formik
      initialValues={{
        username: "ghassen@gmail.com",
        password: "password",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("Username is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login(values.username, values.password);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
          //  dir="rtl"
        >
          <label
            style={{ fontSize: "15px", fontWeight: "bold", color: "#2E6FF1" }}
          >
            {" "}
            username:
          </label>
          <TextField
            error={Boolean(touched.username && errors.username)}
            InputProps={{
              classes: {
                root: classes.input,
              },
            }}
            fullWidth
            helperText={touched.username && errors.username}
            placeholder="user name "
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="username"
            value={values.username}
            variant="outlined"
          />
          <label
            style={{ fontSize: "15px", fontWeight: "bold", color: "#2E6FF1" }}
          >
            password :
          </label>
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            placeholder="password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2} style={{ margin: "auto" }}>
            <Button
              style={{
                backgroundColor: "#489BFF",
                color: "#FFFFFF",
                borderRadius: "30px",
                width: "150px",
              }}
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
