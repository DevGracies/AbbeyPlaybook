import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Button,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  BookOutlined,
  Close,
} from "@mui/icons-material";
import client from "../api/client";

interface User {
  id: number;
  fullName: string; 
  position?: string | null;
  profilePic?: string | null; 
}


interface Playbook {
  id: number;
  title: string;
  content: string; 
  user_id: number;
  loves: number;
  created_at: string;
}


const Explore = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [selected, setSelected] = useState<Playbook | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await client.get("/users/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  
useEffect(() => {
  const fetchFollows = async () => {
    try {
      const res = await client.get("/users/following");
        setFollowedUsers(res.data.map((id: number) => id.toString()));
    } catch (err) {
      console.error("Error fetching current follows", err);
    }
  };
  fetchFollows();
}, []);

useEffect(() => {
    const fetchPlaybooks = async () => {
      try {
        let allPlaybooks: Playbook[] = [];
        for (const userId of followedUsers) {
          const res = await client.get(`/playbooks/users/${userId}/playbooks`); // ✅ fixed route
          allPlaybooks = [...allPlaybooks, ...res.data];
        }
        setPlaybooks(allPlaybooks);
      } catch (err) {
        console.error("Error fetching playbooks", err);
      }
    };

    if (followedUsers.length > 0) {
      fetchPlaybooks();
    } else {
      setPlaybooks([]);
    }
  }, [followedUsers]);


const toggleFollow = async (userId: number) => {
  try {
    if (followedUsers.includes(userId.toString())) {
      await client.post(`/users/unfollow/${userId}`);
      setFollowedUsers((prev) => prev.filter((id) => id !== userId.toString()));
     
      setPlaybooks((prev) => prev.filter((pb) => pb.user_id !== userId));
    } else {
      await client.post(`/users/follow/${userId}`);
      setFollowedUsers((prev) => [...prev, userId.toString()]);

        const res = await client.get(`/playbooks/users/${userId}/playbooks`);
      setPlaybooks((prev) => [...prev, ...res.data]);
    }
  } catch (err) {
    console.error("Error following/unfollowing", err);
  }
};


  const toggleLike = async (pb: Playbook) => {
    try {
      const alreadyLiked = liked[pb.id];
      const res = await client.post(`/playbooks/${pb.id}/love`);
      setPlaybooks((prev) =>
        prev.map((p) =>
          p.id === pb.id ? { ...p, likes: res.data.likes } : p
        )
      );
      setLiked((prev) => ({ ...prev, [pb.id]: !alreadyLiked }));
    } catch (err) {
      console.error("Error liking playbook", err);
    }
  };

  return (
    <Wrapper>
      <SectionTitle>Discover Employees
      </SectionTitle>
      <HorizontalScroll>
       {users.map((user) => (
  <motion.div key={user.id}>
    <UserCard>
      <Avatar src={user.profilePic ?? ""} alt={user.fullName} sx={{ width: 70, height: 70 }} />
      <h3>{user.fullName}</h3>
      <p>{user.position || "No position yet"}</p>
      <FollowButton
        onClick={() => toggleFollow(user.id)}
      >
        {followedUsers.includes(user.id.toString()) ? "Unfollow" : "Follow"}
      </FollowButton>
    </UserCard>
  </motion.div>
))}

      </HorizontalScroll>

      <SectionTitle>Playbooks You Follow</SectionTitle>
      <PlaybookList>
        {playbooks.map((pb) => (
          <motion.div
            key={pb.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PlaybookCard onClick={() => setSelected(pb)}>
              <BookIconWrapper>
                <BookOutlined />
              </BookIconWrapper>
              <h3>{pb.title}</h3>
              <p>{pb.content}</p>
              <PlaybookFooter>
                {/* <span>By {pb.created_at}</span> */}
                <Likes onClick={(e) => { e.stopPropagation(); toggleLike(pb); }}>
                  {liked[pb.id] ? <Favorite /> : <FavoriteBorder />}
                  {pb.loves}
                </Likes>
              </PlaybookFooter>
            </PlaybookCard>
          </motion.div>
        ))}
      </PlaybookList>
      
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {selected?.title}
          <IconButton onClick={() => setSelected(null)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p>{selected?.content}</p>
          {/* <p style={{ marginTop: "1rem", fontWeight: 600 }}>
            Author: {selected?.author}
          </p> */}
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

export default Explore;

const Wrapper = styled.div`
  padding: 2rem;
  background: #f9fafc;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  color: #0d1b2a;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const HorizontalScroll = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  scrollbar-width: thin;
  scrollbar-color: #d62828 transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d62828;
    border-radius: 8px;
  }
`;

const UserCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: 1.5rem;
  min-width: 200px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.06);
  transition: all 0.3s ease;

  h3 {
    margin-top: 0.6rem;
    font-size: 1.1rem;
    color: #0d1b2a;
  }

  p {
    font-size: 0.9rem;
    color: gray;
    margin: 0.3rem 0 1rem;
  }

  &:hover {
    transform: translateY(-6px);
  }
`;

const FollowButton = styled(Button)`
  && {
    background-color: #0d1b2a;
    color: white;
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    text-transform: none;
    border-radius: 8px;

    &:hover {
      background-color: #d62828;
    }
  }
`;

const PlaybookList = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const PlaybookCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  cursor: pointer;

  h3 {
    font-size: 1.3rem;
    color: #0d1b2a;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: #444;
    margin-bottom: 1rem;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const BookIconWrapper = styled.div`
  font-size: 2rem;
  color: #d62828;
  margin-bottom: 0.5rem;
`;

const PlaybookFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
  font-size: 0.9rem;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #d62828;
  cursor: pointer;
`;
