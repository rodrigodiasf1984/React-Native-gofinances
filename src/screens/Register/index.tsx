import React, { useState } from "react";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
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
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
