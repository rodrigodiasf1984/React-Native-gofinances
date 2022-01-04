import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";

interface TypeProps {
  type: "up" | "down";
}

interface ContainerProps extends TypeProps {
  isActive: boolean;
}

export const Main = styled.View<ContainerProps>`
  width: 48%;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ theme, isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
      border: none;
    `}

  ${({ theme, isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.error_light};
      border: none;
    `}
`;

export const Container = styled(GestureHandlerRootView)`
  width: 100%;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 100%;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.error};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
