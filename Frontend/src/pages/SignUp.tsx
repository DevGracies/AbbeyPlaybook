import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { TextField, Button, Typography, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios, { AxiosError } from "axios";

const GlobalReset = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; width: 100%; }
`;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #0a1d37 0%, #07122a 45%, #b71c1c 100%);
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled(motion.div)`
  flex: 1;
  padding: 3rem 2rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  background-image: linear-gradient(rgba(10, 29, 55, 0.12), rgba(183, 28, 28, 0.06));

  @media (max-width: 900px) {
    display: none;
  }
`;

const RightPanel = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.25rem;

  @media (max-width: 900px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

const FormCard = styled(motion.form)`
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 14px;
  padding: 2.25rem;
  box-shadow: 0 12px 40px rgba(4, 16, 30, 0.18);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 8px;
  }
`;

const LogoBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;

  img {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

const StyledLink = styled(Link)`
  color: #0a1d37;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const leftVariant = { hidden: { x: -60, opacity: 0 }, show: { x: 0, opacity: 1 } };
const rightVariant = { hidden: { x: 60, opacity: 0 }, show: { x: 0, opacity: 1 } };

interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { register, handleSubmit } = useForm<SignUpForm>({ mode: "onSubmit" });
  const navigate = useNavigate();

   const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    setErrorMessage(""); 
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post<{
        user: { id: number; email: string; fullName: string };
        accessToken: string;
        refreshToken: string;
      }>(
        "https://abbeyplaybook.onrender.com/api/auth/signup",
        { fullName: data.fullName, email: data.email, password: data.password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      navigate("/login");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ error: string }>;
      setErrorMessage(axiosErr.response?.data?.error || "Something went wrong during signup");
    }
  };

  return (
    <>
      <GlobalReset />
      <PageWrapper>
        <LeftPanel
          initial="hidden"
          animate="show"
          variants={leftVariant}
          transition={{ duration: 0.7 }}
        >
          <LogoBadge>
            <img src="/AbbeyIcon.png" alt="AbbeyPlaybook logo" />
            <div style={{ textAlign: "left" }}>
              <Typography variant="h5" style={{ fontWeight: 700, color: "#fff" }}>
                AbbeyPlaybook
              </Typography>
              <Typography variant="body2" style={{ color: "rgba(255,255,255,0.9)" }}>
                Build. Share. Learn. Unlock your potential with collaborative playbooks.
              </Typography>
            </div>
          </LogoBadge>

          <Typography
            variant="h4"
            style={{ fontWeight: 700, lineHeight: 1.05, maxWidth: 420, color: "#fff" }}
          >
            Join AbbeyPlaybook — your growth starts here 🚀
          </Typography>

          <Typography variant="body1" style={{ maxWidth: 420, color: "rgba(255,255,255,0.85)" }}>
            Create an account and start documenting your processes, sharing insights, 
            and following proven playbooks from peers.
          </Typography>
        </LeftPanel>

        <RightPanel
          initial="hidden"
          animate="show"
          variants={rightVariant}
          transition={{ duration: 0.7 }}
        >
          <FormCard
            onSubmit={handleSubmit(onSubmit)}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            {errorMessage && (
              <Typography
                variant="body2"
                style={{ color: "#b71c1c", fontWeight: 600, marginBottom: "0.5rem" }}
              >
                {errorMessage}
              </Typography>
            )}

            <Typography variant="h6" style={{ fontWeight: 800, color: "#0a1d37" }}>
              Create your AbbeyPlaybook account
            </Typography>

            <Typography variant="body2" style={{ color: "#374151" }}>
              Already have an account? <StyledLink to="/login">Sign in here</StyledLink>
            </Typography>

            <TextField
              label="Full Name"
              fullWidth
              required
              {...register("fullName")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              {...register("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              {...register("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              {...register("confirmPassword")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#0a1d37",
                "&:hover": { background: "#b71c1c" },
                py: 1.1,
                fontWeight: 700,
                borderRadius: "10px",
                textTransform: "none",
              }}
            >
              Sign Up
            </Button>

            <BottomRow>
              <Typography variant="caption" style={{ color: "#6b7280" }}>
                By signing up you agree to our <StyledLink to="/terms">Terms</StyledLink> &{" "}
                <StyledLink to="/privacy">Privacy</StyledLink>.
              </Typography>
            </BottomRow>
          </FormCard>
        </RightPanel>
      </PageWrapper>
    </>
  );
}
