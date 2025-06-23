import React from 'react';
import {
  AvatarList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
  StyledH2,
} from '@/components';
import { currencyConverter } from '@/utils';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';
import { useAxiosGet } from '@/hooks';
import { Seller, NewsItem } from '@/types';

function Home() {
  // Fetch metrics
  const totalSalesHook = useAxiosGet<number>('/api/sales/total');
  const salesGoalHook = useAxiosGet<number>('/api/sales/goal');
  const contactedLeadsHook = useAxiosGet<number>('/api/leads/contacted');

  // Fetch chart data
  const salesChartHook = useAxiosGet<number[]>('/api/sales/chart-data');
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  // Fetch top sellers
  const topSellersHook = useAxiosGet<Seller[]>('/api/sales/top-sellers');

  // Fetch news
  const newsHook = useAxiosGet<NewsItem[]>('/api/news');

  const isLoading =
    totalSalesHook.loading ||
    salesGoalHook.loading ||
    contactedLeadsHook.loading ||
    salesChartHook.loading ||
    topSellersHook.loading ||
    newsHook.loading;

  const hasError =
    totalSalesHook.error ||
    salesGoalHook.error ||
    contactedLeadsHook.error ||
    salesChartHook.error ||
    topSellersHook.error ||
    newsHook.error;

  if (isLoading) {
    return (
      <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: 50 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (hasError) {
    return (
      <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: 50 }}>
        <Typography color="error">{hasError}</Typography>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <CardComponent>
              <StyledH2 className="mb-1">Total de vendas no mês</StyledH2>
              <Typography variant="h4">
                {currencyConverter(totalSalesHook.data || 0)}
              </Typography>
            </CardComponent>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardComponent>
              <StyledH2 className="mb-1">Meta do mês</StyledH2>
              <Typography variant="h4">
                {currencyConverter(salesGoalHook.data || 0)}
              </Typography>
            </CardComponent>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardComponent>
              <StyledH2 className="mb-1">Leads contactados</StyledH2>
              <Typography variant="h4">
                {contactedLeadsHook.data || 0}
              </Typography>
            </CardComponent>
          </Grid>

          <Grid item xs={12} md={7}>
            <CardComponent>
              <StyledH2 className="mb-1">Valor de vendas no mês</StyledH2>
              <CustomChart
                labels={chartLabels}
                data={salesChartHook.data || []}
                type="line"
              />
            </CardComponent>
          </Grid>

          <Grid item xs={12} md={5}>
            <CardComponent>
              <StyledH2 className="mb-1">Maiores vendedores do mês</StyledH2>
              <AvatarList
                listData={(topSellersHook.data || []).map((seller) => ({
                  name: seller.name,
                  subtitle: currencyConverter(seller.total),
                  avatar: seller.avatar,
                }))}
              />
            </CardComponent>
          </Grid>

          <Grid item xs={12} md={7}>
            <CardComponent>
              <StyledH2 className="mb-1">Notícias relevantes</StyledH2>
              <CustomTable
                header={["Título", "Autor", "Ações"]}
                rows={(newsHook.data || []).map((item) => [
                  <span key={item.id}>{item.title}</span>,
                  <span key={`${item.id}-author`}>{item.email}</span>,
                  <button key={`${item.id}-action`}>VER</button>,
                ])}
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;