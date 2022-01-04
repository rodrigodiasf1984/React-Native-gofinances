import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title, Icon, Button, Main } from "./styles";

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Main isActive={isActive} type={type}>
      <Container>
        <Button {...rest}>
          <Icon name={icons[type]} type={type} />
          <Title>{title}</Title>
        </Button>
      </Container>
    </Main>
  );
}
