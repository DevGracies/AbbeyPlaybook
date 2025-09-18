import React, { useState } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const StyledAppBar = styled(AppBar)`
  background-color: #0a1d37; 
  box-shadow: none;
  position: fixed !important; 
  top: 0;
  left: 0;
  width: 100%;
`;

const Brand = styled(Link)`
  font-weight: bold;
  font-size: 1.4rem;
  color: #d72638; /* red */
  text-decoration: none;
  flex-grow: 1;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s ease-in-out;

    &:hover {
      color: #d72638;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <StyledAppBar
        component={motion.div}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between", padding: "0 1rem" }}>
      
          <Brand to="/">AbbeyPlaybook</Brand>

    
          <NavLinks>
            <Link to="/">Home</Link>
            <Link to="/playbooks">Playbooks</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/profile">Profile</Link>
          </NavLinks>

        
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>

         
          <MobileMenu>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </MobileMenu>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/playbooks" onClick={toggleDrawer(false)}>
            <ListItemText primary="Playbooks" />
          </ListItem>
          <ListItem button component={Link} to="/explore" onClick={toggleDrawer(false)}>
            <ListItemText primary="Explore" />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
