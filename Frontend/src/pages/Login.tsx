// src/pages/Login.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../context/Reducer/authReducer";
import styled, { createGlobalStyle } from "styled-components";
import { TextField, Button, Typography, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

const GlobalReset = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; width: 100%; }
`;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 64px); /* keep below a fixed navbar (64px) if present */
  background: linear-gradient(90deg, #0a1d37 0%, #07122a 45%, #b71c1c 100%);
  overflow: hidden;

  @media (max-width: 900px) {
    min-height: calc(100vh - 56px);
    flex-direction: column;
  }
`;

const LeftPanel = styled(motion.div)`
  flex: 1;
  padding: 3.5rem 2rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
  text-align: center;
  background-image: linear-gradient(
    rgba(10, 29, 55, 0.12),
    rgba(183, 28, 28, 0.06)
  );

  @media (max-width: 900px) {
    display: none; /* hide creative left hero on small screens for focus */
  }
`;

const RightPanel = styled(motion.div)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.25rem;
  background: transparent;

  @media (max-width: 900px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

const FormCard = styled(motion.form)`
  width: 100%;
  max-width: 460px;
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
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 0.25rem;

  img {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  color: #0a1d37;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const leftVariant = { hidden: { x: -60, opacity: 0 }, show: { x: 0, opacity: 1 } };
const rightVariant = { hidden: { x: 60, opacity: 0 }, show: { x: 0, opacity: 1 } };

export default function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<any>({ mode: "onSubmit" });
  const dispatch = useDispatch<any>();

  const onSubmit = (data: any) => {
  
    dispatch<any>(login(data));
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
    
            <img src="../assets/AbbeyIcon.png" alt="AbbeyPlaybook logo" />
            <div style={{ textAlign: "left" }}>
              <Typography variant="h5" style={{ color: "#fff", fontWeight: 700 }}>
                AbbeyPlaybook
              </Typography>
              <Typography variant="body2" style={{ color: "rgba(255,255,255,0.9)" }}>
                Build. Share. Learn. Follow top playbooks and grow faster at work.
              </Typography>
            </div>
          </LogoBadge>

          <Typography
            variant="h4"
            style={{
              color: "#fff",
              fontWeight: 700,
              maxWidth: 420,
              lineHeight: 1.05,
            }}
          >
            Welcome back — ready to level up your role?
          </Typography>

          <Typography
            variant="body1"
            style={{ color: "rgba(255,255,255,0.85)", maxWidth: 420 }}
          >
            Sign in quickly and continue exploring curated playbooks from top contributors.
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
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Typography variant="h6" style={{ color: "#0a1d37", fontWeight: 800 }}>
                Sign in to AbbeyPlaybook
              </Typography>
              <Typography variant="body2" style={{ color: "#374151" }}>
                New here?{" "}
                <StyledLink to="/signup" aria-label="Go to signup">
                  Create an account
                </StyledLink>
              </Typography>
            </div>

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              {...register("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="action" />
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

            <MetaRow>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              </div>

              <StyledLink to="/forgot-password">Forgot password?</StyledLink>
            </MetaRow>

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
              Sign in
            </Button>

            <BottomRow>
              <Typography variant="caption" style={{ color: "#6b7280" }}>
                By signing in you agree to our{" "}
                <StyledLink to="/terms">Terms</StyledLink> &{" "}
                <StyledLink to="/privacy">Privacy</StyledLink>
              </Typography>

              <Typography variant="caption" style={{ color: "#6b7280" }}>
                New hire?{" "}
                <StyledLink to="/SignUp" aria-label="Sign up">
                  Signup here →
                </StyledLink>
              </Typography>
            </BottomRow>
          </FormCard>
        </RightPanel>
      </PageWrapper>
    </>
  );
}
