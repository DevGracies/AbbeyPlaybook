import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem 5%;
  background: linear-gradient(180deg, #0a1d37 0%, #07122a 35%, #b71c1c 100%);
  min-height: calc(100vh - 64px);
  color: #fff;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CreateSection = styled(motion.div)`
  background: #fff;
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(4, 16, 30, 0.2);
  max-width: 850px;
  margin: 0 auto;
  color: #0a1d37;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 600px) {
    padding: 1.25rem;
  }
`;

const MyPlaybooks = styled.div`
  max-width: 950px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const PlaybookCard = styled(motion(Card))`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(10, 29, 55, 0.15);
  display: flex;
  flex-direction: column;
`;

export default function Playbook() {
  const [playbooks, setPlaybooks] = useState<
    { title: string; content: string }[]
  >([
    {
      title: "Onboarding Workflow",
      content:
        "Steps to onboard new hires effectively. Includes tool setup, intro sessions, and buddy assignment.",
    },
    {
      title: "Weekly Reporting",
      content:
        "Guide on writing weekly reports that add value — focusing on insights, blockers, and next week’s goals.",
    },
  ]);

  const [newPlaybook, setNewPlaybook] = useState({
    title: "",
    content: "",
  });

  const handleCreate = () => {
    if (!newPlaybook.title || !newPlaybook.content) return;
    setPlaybooks([newPlaybook, ...playbooks]);
    setNewPlaybook({ title: "", content: "" });
  };

  return (
    <PageWrapper>
      <HeroSection
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <LibraryBooksIcon sx={{ fontSize: 60, color: "#fff" }} />
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: "#fff", lineHeight: 1.2 }}
        >
          Your Role, Your Playbook ✨
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 650, color: "rgba(255,255,255,0.9)", margin: "0 auto" }}
        >
          Every employee has a unique way of working. AbbeyPlaybook helps you:
          <br />
          Document processes, capture lessons, and build a living guide that
          grows with you.
        </Typography>
      </HeroSection>
      <CreateSection
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Create a New Playbook
        </Typography>
        <TextField
          label="Playbook Title"
          fullWidth
          value={newPlaybook.title}
          onChange={(e) =>
            setNewPlaybook({ ...newPlaybook, title: e.target.value })
          }
        />
        <TextField
          label="Write your playbook..."
          fullWidth
          multiline
          minRows={5}
          value={newPlaybook.content}
          onChange={(e) =>
            setNewPlaybook({ ...newPlaybook, content: e.target.value })
          }
        />
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleCreate}
          sx={{
            background: "#0a1d37",
            "&:hover": { background: "#b71c1c" },
            alignSelf: "flex-start",
            px: 3,
            fontWeight: 700,
            borderRadius: "10px",
            textTransform: "none",
          }}
        >
          Save Playbook
        </Button>
      </CreateSection>

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, textAlign: "center", marginTop: "1rem" }}
      >
        My Playbooks
      </Typography>

      <MyPlaybooks>
        {playbooks.map((pb, idx) => (
          <PlaybookCard
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#0a1d37" }}
              >
                {pb.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#374151", marginTop: "0.5rem" }}
              >
                {pb.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                sx={{ color: "#0a1d37", fontWeight: 600, textTransform: "none" }}
              >
                View
              </Button>
              <Button
                size="small"
                sx={{ color: "#b71c1c", fontWeight: 600, textTransform: "none" }}
              >
                Delete

              </Button>
            </CardActions>
          </PlaybookCard>
        ))}
      </MyPlaybooks>
    </PageWrapper>
  );
}
