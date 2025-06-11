import {
  AvatarList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
} from '@/components'
import { currencyConverter } from '@/utils'
import { Container } from '@mui/material'

function Home() {
  const mockListData = [
    {
      name: 'John Doe',
      subtitle: currencyConverter(1234.56),
      avatar: '/dnc-avatar.jpg',
    },
    {
      name: 'Jane Smith',
      subtitle: currencyConverter(7890.12),
      avatar: '/dnc-avatar.jpg',
    },
    {
      name: 'Mike Brown',
      subtitle: currencyConverter(3456.78),
      avatar: '/dnc-avatar.jpg',
    },
    {
      name: 'Alice Johnson',
      subtitle: currencyConverter(4567.89),
      avatar: '/dnc-avatar.jpg',
    },
  ]

  const mockTableData = {
    headers: ['Name', 'Email', 'Actions'],
    rows: [
      [
        <span key="name-1">Nome 1</span>,
        <span key="email-1">nome1@email.com</span>,
        <button key="action-1">ACTION</button>,
      ],
      [
        <span key="name-2">Nome 2</span>,
        <span key="email-2">nome2@email.com</span>,
        <button key="action-2">ACTION</button>,
      ],
      [
        <span key="name-3">Nome 3</span>,
        <span key="email-3">nome3@email.com</span>,
        <button key="action-3">ACTION</button>,
      ],
    ],
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>CARD</CardComponent>
        <CardComponent>
          <AvatarList listData={mockListData} />
        </CardComponent>
        <CardComponent>
          <CustomTable
            header={mockTableData.headers}
            rows={mockTableData.rows}
          />
        </CardComponent>
        <CardComponent>
          <CustomChart
            labels={['Jan', 'Feb', 'Mar', 'Abr', 'Mai']}
            data={[1000.12, 2456.54, 986.32, 654.89, 754.89, 354.89]}
            type="line"
          />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
