import React, { useEffect, useState } from "react";
import {
  HighlightCard,
  TransactionCard,
  ITransactionCardProps,
} from "../../components";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  TransactionsTitle,
  TransactionsList,
  LogoutButton,
} from "./styles";

export interface DataListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  const dataKeyAsyncStorage = "@goginances:transactions";

  async function loadTransactions() {
    await AsyncStorage.getItem(dataKeyAsyncStorage).then((response) => {
      const transactions = response ? JSON.parse(response) : [];

      const formattedTransactions: DataListProps[] = transactions.map(
        (transaction: DataListProps) => {
          const amount = Number(transaction.amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formattedDate = Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(transaction.date));

          return {
            id: transaction.id,
            name: transaction.name,
            amount,
            type: transaction.type,
            category: transaction.category,
            date: formattedDate,
          };
        }
      );
      setData(formattedTransactions);
    });
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/30758309?v=4",
              }}
            />
            <User>
              <UserGreetings>Olá,</UserGreetings>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount="R$17.400,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount="R$1.259,00"
          lastTransaction="Última entrada dia 03 de Abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$16.141,00"
          lastTransaction="01 à 16 de Abril"
        />
      </HighlightCards>
      <Transactions>
        <TransactionsTitle>Listagem</TransactionsTitle>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
