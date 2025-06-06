import { Container } from '@mui/material'
import { AvatarList, CardComponent, Header } from '@/components'
import { currencyConverter } from '@/utils'
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
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>CARD</CardComponent>
        <CardComponent>
          <AvatarList listData={mockListData} />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
