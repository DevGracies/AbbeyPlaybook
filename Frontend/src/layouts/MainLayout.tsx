import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
  margin-top: 64px; 
`;

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Content>
       <Outlet /> 
      </Content>
      <Footer />
    </LayoutWrapper>
  );
};

export default MainLayout;
