import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FooterContainer = styled.footer`
  background-color: #0a1d37; 
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  width: 100%;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer
      as={motion.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      © {new Date().getFullYear()} AbbeyPlaybook. Built for growth, guided by connection.
    </FooterContainer>
  );
};

export default Footer;
