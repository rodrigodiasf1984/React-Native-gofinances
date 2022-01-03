import React from "react";

import { Container, Icon, Category } from "./styles";

type CategoryProps = {
  title: string;
  onPress: () => void;
};
export function CategorySelectButton({ title, onPress }: CategoryProps) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
