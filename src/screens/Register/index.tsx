import React, { useEffect, useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import {
  Button,
  InputForm,
  TransactionTypeButton,
  CategorySelectButton,
} from "../../components/Form";
import { CategorySelect } from "../CategorySelect";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

type FormData = {
  name: string;
  amount: string;
};

type NavigationProps = {
  navigate: (screen: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("Informe um valor positivo"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProps>();

  const handleRegister = async (form: FormData) => {
    const { name, amount } = form;
    if (!transactionType) {
      return Alert.alert("Selecione um tipo de transação");
    }
    if (category.key === "category") {
      return Alert.alert("Selecione uma categoria");
    }

    const newTransaction = {
      id: uuid.v4().toString(),
      name,
      amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKeyAsyncStorage = "@goginances:transactions";
      const data = await AsyncStorage.getItem(dataKeyAsyncStorage);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(
        dataKeyAsyncStorage,
        JSON.stringify(dataFormatted)
      );
      reset();
      setTransactionType("");
      setCategory({ key: "category", name: "Categoria" });
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao cadastrar");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                isActive={transactionType === "positive"}
                title="Entrada"
                type="up"
                onPress={() => setTransactionType("positive")}
              />
              <TransactionTypeButton
                isActive={transactionType === "negative"}
                title="Saída"
                type="down"
                onPress={() => setTransactionType("negative")}
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
    </TouchableWithoutFeedback>
  );
}
