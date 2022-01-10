import React, { useCallback, useEffect, useState } from "react";
import {
  HighlightCard,
  TransactionCard,
  ITransactionCardProps,
} from "../../components";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

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
  LoadContainer,
} from "./styles";
import { useTheme } from "styled-components";

export interface DataListProps extends ITransactionCardProps {
  id: string;
}
type HighlightProps = {
  amount: string;
  lastTransaction: string;
};

type HighlightData = {
  entries: HighlightProps;
  withdrawals: HighlightProps;
  total: HighlightProps;
};

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const dataKeyAsyncStorage = "@goginances:transactions";
  const theme = useTheme();

  function getLastransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction: DataListProps) => transaction.type === type)
          .map((transaction: DataListProps) =>
            new Date(transaction.date).getTime()
          )
      )
    );

    return `${lastransaction.getDate()} de ${lastransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    await AsyncStorage.getItem(dataKeyAsyncStorage).then((response) => {
      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let withdrawalsTotal = 0;

      const formattedTransactions: DataListProps[] = transactions.map(
        (transaction: DataListProps) => {
          if (transaction.type === "positive") {
            entriesTotal += Number(transaction.amount);
          } else {
            withdrawalsTotal += Number(transaction.amount);
          }

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

      setTransactions(formattedTransactions);
      const lastTransactionEntries = getLastransactionDate(
        transactions,
        "positive"
      );
      const lastTransactionsWithdrawals = getLastransactionDate(
        transactions,
        "negative"
      );
      const totalInterval = `01 a ${lastTransactionsWithdrawals}`;

      const total = entriesTotal - withdrawalsTotal;

      setHighlightData({
        entries: {
          amount: entriesTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
        },
        withdrawals: {
          amount: withdrawalsTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: `Última saída dia ${lastTransactionsWithdrawals}`,
        },
        total: {
          amount: total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: totalInterval,
        },
      });
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
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
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="outcome"
              title="Saídas"
              amount={highlightData.withdrawals.amount}
              lastTransaction={highlightData.withdrawals.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>
          <Transactions>
            <TransactionsTitle>Listagem</TransactionsTitle>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
