import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock data
const mockTotal = 5000;
const mockGoal = 10000;
const mockContacted = 30;
const mockChart = [100,200,300,400,500];
const mockSellers = [{ name: 'Alice', total: 1000, avatar: '/img.jpg' }];
const mockNews = [{ id: '1', title: 'News', email: 'a@b.com' }];

// Setup MSW server
const server = setupServer(
  rest.get('/api/sales/total', (req, res, ctx) => res(ctx.json(mockTotal))),
  rest.get('/api/sales/goal', (req, res, ctx) => res(ctx.json(mockGoal))),
  rest.get('/api/leads/contacted', (req, res, ctx) => res(ctx.json(mockContacted))),
  rest.get('/api/sales/chart-data', (req, res, ctx) => res(ctx.json(mockChart))),
  rest.get('/api/sales/top-sellers', (req, res, ctx) => res(ctx.json(mockSellers))),
  rest.get('/api/news', (req, res, ctx) => res(ctx.json(mockNews))),
);

describe('Home Page Integration', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders metrics and data correctly', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => expect(screen.getByText(/Total de vendas no mês/i)).toBeInTheDocument());
    expect(screen.getByText(/R\$50.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Meta do mês/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Leads contactados/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument();
    expect(screen.getByText(/Maiores vendedores do mês/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Notícias relevantes/i)).toBeInTheDocument();
  });
});
