import TransferForm from '../../components/TransferForm'
import Transactions from '../../components/Transactions'
import Header from '../../components/Header'
import './styles.scss'

const Home = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="home">
        <section className="transfer">
          <TransferForm />
        </section>
        <Transactions />
      </main>
    </>
  )
}

export default Home
