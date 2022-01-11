import { HistoryCard } from "../../components";

import { Container, Title, Header } from "./styles";
export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      <HistoryCard title="Compras" amount="R$ 150.00" color="red" />
    </Container>
  );
}
