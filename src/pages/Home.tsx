import { Container } from '@mui/material'
import { CardComponent, Header } from '@/components'
function Home() {
    return (
        <>
           <Header />
           <Container maxWidth="lg">
            <CardComponent>CARD</CardComponent>
            </Container>
        </>
    )
}

export default Home