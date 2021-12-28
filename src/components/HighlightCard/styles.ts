import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
  type: "income" | "outcome" | "total";
}

export const Container = styled.View<TypeProps>`
  background: ${({ theme, type }) =>
    type !== "total" ? theme.colors.shape : theme.colors.secondary};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.text_dark : theme.colors.shape};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;
  ${({ type }) =>
    type === "outcome" &&
    css`
      color: ${({ theme }) => theme.colors.error};
    `};
  ${({ type }) =>
    type === "income" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};
  ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `};
`;
export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.text_dark : theme.colors.shape};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.text : theme.colors.shape};
`;
