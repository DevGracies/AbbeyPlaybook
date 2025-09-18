import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button, Avatar } from "@mui/material";
import { FavoriteBorder, BookOutlined } from "@mui/icons-material";

const users = [
  { id: 1, name: "John Doe", position: "Software Engineer", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Sarah Smith", position: "Product Manager", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Michael Lee", position: "UX Designer", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Emily Davis", position: "Data Analyst", avatar: "https://i.pravatar.cc/150?img=4" },
];

const playbooks = [
  { id: 1, title: "Scaling Microservices", author: "John Doe", description: "Best practices on scaling backend services.", likes: 24 },
  { id: 2, title: "UX Research Guide", author: "Sarah Smith", description: "How to run effective user research.", likes: 18 },
  { id: 3, title: "Data Analysis Workflow", author: "Emily Davis", description: "Efficient ways to analyze data using Python.", likes: 32 },
];

const Explore: React.FC = () => {
  return (
    <Wrapper>
     
      <SectionTitle>Discover Employees</SectionTitle>
      <HorizontalScroll>
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <UserCard>
              <Avatar src={user.avatar} alt={user.name} sx={{ width: 70, height: 70 }} />
              <h3>{user.name}</h3>
              <p>{user.position}</p>
              <FollowButton variant="contained">Follow</FollowButton>
            </UserCard>
          </motion.div>
        ))}
      </HorizontalScroll>

      {/* Playbooks Section */}
      <SectionTitle>Playbooks You Follow</SectionTitle>
      <PlaybookList>
        {playbooks.map((pb) => (
          <motion.div
            key={pb.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PlaybookCard>
              <BookIconWrapper>
                <BookOutlined />
              </BookIconWrapper>
              <h3>{pb.title}</h3>
              <p>{pb.description}</p>
              <PlaybookFooter>
                <span>By {pb.author}</span>
                <Likes>
                  <FavoriteBorder /> {pb.likes}
                </Likes>
              </PlaybookFooter>
            </PlaybookCard>
          </motion.div>
        ))}
      </PlaybookList>
    </Wrapper>
  );
};

export default Explore;

/* ------------------- Styled Components ------------------- */
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
`;
