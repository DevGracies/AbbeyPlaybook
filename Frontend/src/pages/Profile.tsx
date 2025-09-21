import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Avatar, Button, TextField } from "@mui/material";
import { Edit, Save, Logout, Upload } from "@mui/icons-material";
import client from "../api/client";
import { logout } from "../context/Reducer/authReducer";
import { useDispatch } from "react-redux";

type ProfileData = {
  id?: number;
  fullName: string;
  position?: string | null;
  aboutWork?: string | null;
  profilePic?: string | null;
  email?: string;
};

const Profile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    position: "",
    aboutWork: "",
    profilePic: "",
  });

  const dispatch = useDispatch();

useEffect(() => {
   const storedProfile = localStorage.getItem("profile");
  if (storedProfile) {
    setProfile(JSON.parse(storedProfile));
  }
  
  const fetchProfile = async () => {
    try {
      const { data } = await client.get<ProfileData>("/users/profile");
      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  fetchProfile();
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setProfile(prev => ({ ...prev, [name]: value }));
};

const handleSave = async () => {
  try {
    setLoading(true);

    const payload = {
      fullName: profile.fullName,
      position: profile.position,
      aboutWork: profile.aboutWork,
      profilePic: profile.profilePic,
    };

    console.log("Updating profile with payload:", payload);

    const { data } = await client.put<ProfileData>("/users/profile", payload);

    setProfile({
      id: data.id,
      fullName: data.fullName ?? "",
      position: data.position ?? "",
      aboutWork: data.aboutWork ?? "",
      profilePic: data.profilePic ?? "",
      email: data.email,
    });
 localStorage.setItem("profile", JSON.stringify(data));
    setEditMode(false);
    console.log("Profile updated:", data);

  } catch (err) {
    console.error("Error updating profile:", err);
  } finally {
    setLoading(false);
  }
};

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const { data } = await client.post<{ avatarUrl: string; user?: ProfileData }>(
        "/users/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfile(prev => ({ ...prev, profilePic: data.avatarUrl }));
    } catch (err) {
      console.error("Error uploading avatar:", err);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      window.location.href = "/login";
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <Wrapper>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <ProfileCard>
          <AvatarWrapper>
            <Avatar src={profile.profilePic || undefined} sx={{ width: 120, height: 120 }} />
            {editMode && (
              <UploadLabel htmlFor="avatar-upload">
                <Upload fontSize="small" /> Upload
              </UploadLabel>
            )}
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </AvatarWrapper>

          <ProfileInfo>
            {editMode ? (
              <>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Position"
                  name="position"
                  value={profile.position ?? ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="What I love about my work"
                  name="aboutWork"
                  value={profile.aboutWork ?? ""}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                />
              </>
            ) : (
              <>
                <h2>{profile.fullName}</h2>
                <h4>{profile.position}</h4>
                <p>{profile.aboutWork}</p>
              </>
            )}
          </ProfileInfo>

          <Actions>
            {editMode ? (
              <ActionButton variant="contained" onClick={handleSave} startIcon={<Save />} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </ActionButton>
            ) : (
              <ActionButton variant="contained" onClick={() => setEditMode(true)} startIcon={<Edit />}>
                Edit Profile
              </ActionButton>
            )}
            <LogoutButton variant="outlined" startIcon={<Logout />} onClick={handleLogout}>
              Logout
            </LogoutButton>
          </Actions>
        </ProfileCard>
      </motion.div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  background: #f9fafc;
  min-height: 100vh;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 550px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const UploadLabel = styled.label`
  position: absolute;
  bottom: -10px;
  right: -10px;
  background: #d62828;
  color: white;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #0d1b2a;
  }
`;

const ProfileInfo = styled.div`
  h2 {
    font-size: 1.6rem;
    color: #0d1b2a;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1rem;
    color: #d62828;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.95rem;
    color: #444;
    margin-bottom: 1.5rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ActionButton = styled(Button)`
  && {
    background-color: #0d1b2a;
    color: white;
    text-transform: none;

    &:hover {
      background-color: #d62828;
    }
  }
`;

const LogoutButton = styled(Button)`
  && {
    border-color: #d62828;
    color: #d62828;
    text-transform: none;

    &:hover {
      border-color: #0d1b2a;
      color: #0d1b2a;
    }
  }
`;
