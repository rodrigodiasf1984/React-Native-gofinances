import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import { CategorySelect } from "../CategorySelect";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  amount: string;
};

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const { control, handleSubmit } = useForm();

  const handleRegister = (form: FormData) => {
    const { name, amount } = form;
    const data = {
      name,
      amount,
      transactionType,
      category: category.key,
    };
    console.log("form", data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm name="name" control={control} placeholder="Nome" />
          <InputForm name="amount" control={control} placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton
              isActive={transactionType === "up"}
              title="Entrada"
              type="up"
              onPress={() => setTransactionType("up")}
            />
            <TransactionTypeButton
              isActive={transactionType === "down"}
              title="Saída"
              type="down"
              onPress={() => setTransactionType("down")}
            />
          </TransactionsTypes>
          <CategorySelectButton
            onPress={() => setCategoryModalOpen(true)}
            title={category.name}
          />
        </Fields>
        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectedCategory={() => setCategoryModalOpen(false)}
        />
      </Modal>
    </Container>
  );
}
