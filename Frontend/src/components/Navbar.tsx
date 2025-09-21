import React, { useState } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

const MotionAppBar = motion(AppBar);

const StyledAppBar = styled(MotionAppBar)`
  background-color: #0a1d37;
  box-shadow: none;
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
`;

const Brand = styled(RouterLink)`
  font-weight: bold;
  font-size: 1.4rem;
  color: #d72638;
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
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const links = [
    { text: "Home", path: "/" },
    { text: "Playbooks", path: "/playbooks" },
    { text: "Explore", path: "/explore" },
    { text: "Profile", path: "/profile" },
  ];

  return (
    <>
      <StyledAppBar
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1rem",
          }}
        >
          <Brand to="/">AbbeyPlaybook</Brand>

          <NavLinks>
            {links.map(link => (
              <RouterLink key={link.text} to={link.path}>
                {link.text}
              </RouterLink>
            ))}
          </NavLinks>

          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>

          <MobileMenu>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </MobileMenu>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {links.map(link => (
            <ListItemButton
              key={link.text}
              component={RouterLink}
              to={link.path}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={link.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
