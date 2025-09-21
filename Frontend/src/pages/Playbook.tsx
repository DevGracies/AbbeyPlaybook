import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import client from "../api/client";
import { PlaybookType } from "../types/types";

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
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;


const PlaybookCard = styled(motion(Card))`
  width: 280px;
  height: 200px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(10, 29, 55, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }

  .playbook-title {
    font-size: 1rem;
    font-weight: 700;
    color: #0a1d37;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .playbook-content {
    font-size: 0.85rem;
    color: #374151;
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* show only 4 lines */
    -webkit-box-orient: vertical;
  }
`;

export default function Playbook() {
  const [playbooks, setPlaybooks] = useState<PlaybookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPlaybook, setNewPlaybook] = useState({ title: "", content: "" });

  const [selected, setSelected] = useState<PlaybookType | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPlaybooks = async () => {
      try {
        const res = await client.get("/playbooks/me");

        const mapped: PlaybookType[] = res.data.map(
          (pb: { id: number; title: string; content: string }) => ({
            id: pb.id,
            title: pb.title,
            content: pb.content,
          })
        );

        setPlaybooks(mapped);
      } catch (err) {
        console.error("Error fetching playbooks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaybooks();
  }, []);

  const handleCreate = async () => {
    if (!newPlaybook.title || !newPlaybook.content) return;

    try {
      const res = await client.post("/playbooks", {
        title: newPlaybook.title,
        content: newPlaybook.content,
      });;

      const mapped: PlaybookType = {
        id: res.data.id,
        title: res.data.title,
        content: res.data.content,
      };

      setPlaybooks([mapped, ...playbooks]);
      setNewPlaybook({ title: "", content: "" });
    } catch (err) {
      console.log("Token in localStorage:", localStorage.getItem("token"));
      console.error("Error creating playbook", err);
    }
  };

 const handleUpdate = async () => {
  if (!selected) return;
  try {
    const res = await client.put(`/playbooks/${selected.id}`, {
      title: selected.title,
      content: selected.content,
    });

    const mapped: PlaybookType = {
      id: res.data.id,
      title: res.data.title,
      content: res.data.content,
    };

    setPlaybooks((prev: PlaybookType[]) =>
      prev.map((pb) => (pb.id === selected.id ? mapped : pb))
    );

    setSelected(mapped); 
    setEditMode(false);
  } catch (err) {
    console.error("Error updating playbook", err);
  }
};

  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/playbooks/${id}`);
      setPlaybooks((prev) => prev.filter((pb) => pb.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      console.error("Error deleting playbook", err);
    }
  };

  if (loading) {
    return (
      <PageWrapper style={{ textAlign: "center", marginTop: "3rem" }}>
        <CircularProgress sx={{ color: "#fff" }} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <HeroSection
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <LibraryBooksIcon sx={{ fontSize: 60, color: "#fff" }} />
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#fff" }}>
          Your Role, Your Playbook ✨
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 650,
            color: "rgba(255,255,255,0.9)",
            margin: "0 auto",
          }}
        >
          Every employee has a unique way of working. AbbeyPlaybook helps you:
          <br />
          Document processes, capture lessons, and build a living guide that
          grows with you.
        </Typography>
      </HeroSection>

      <CreateSection>
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
        {playbooks.map((pb) => (
          <PlaybookCard key={pb.id}>
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
                onClick={() => setSelected(pb)}
                sx={{ color: "#0a1d37", fontWeight: 600, textTransform: "none" }}
              >
                View
              </Button>
              <Button
                size="small"
                onClick={() => handleDelete(pb.id)}
                sx={{ color: "#b71c1c", fontWeight: 600, textTransform: "none" }}
              >
                Delete
              </Button>
            </CardActions>
          </PlaybookCard>
        ))}
      </MyPlaybooks>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {editMode ? "Edit Playbook" : selected?.title}
          <IconButton onClick={() => setSelected(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {editMode ? (
            <>
              <TextField
                value={selected?.title || ""}
                onChange={(e) =>
                  setSelected((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
              />
              <TextField
                value={selected?.content || ""}
                multiline
                minRows={5}
                onChange={(e) =>
                  setSelected((prev) =>
                    prev ? { ...prev, content: e.target.value } : prev
                  )
                }
              />
              <Button
                startIcon={<SaveIcon />}
                onClick={handleUpdate}
                variant="contained"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography>{selected?.content}</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                sx={{ color: "#b71c1c" }}
                onClick={() => selected && handleDelete(selected.id)}
              >
                Delete
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
