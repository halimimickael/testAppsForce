import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";

export const NoContainerList = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const ListContainer = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 180px;
`;

export const CardBox = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  min-height: 360px;
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

export const ButtonPos = styled(Box)`
  position: absolute;
  top: 16px;
  right: 16px;

  button {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    color: #8928d5;
    border-radius: 50%;
    margin-left: 8px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f5f5f5;
      border-color: #8928d5;
      transform: scale(1.1);
    }
  }
`;

export const UserImage = styled(Image)`
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const UserName = styled(Typography)`
  font-weight: 600;
  color: #333;
  margin-top: 16px;
`;

export const UserDetails = styled(Typography)`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  }
`;
