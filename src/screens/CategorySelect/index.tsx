import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Divider,
  Footer,
} from "./styles";

type Category = {
  key: string;
  name: string;
};

interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectedCategory: () => void;
}
export function CategorySelect({
  category,
  setCategory,
  closeSelectedCategory,
}: CategorySelectProps) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
      <Footer>
        <Button onPress={closeSelectedCategory} title="Selecionar" />
      </Footer>
    </Container>
  );
}
