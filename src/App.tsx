import Navigation from "./components/UI-UX/navigation/Navigation";
import Card from "./components/UI-UX/card/Card";
import CardOrder from "./components/card-order/CardOrder";
import Footer from "./components/UI-UX/footer/Footer";
import Wrapper from "./components/UI-UX/containers/Wrapper";

export default function App() {
  return (
    <Wrapper>
      <Navigation />
      <Card>
        <CardOrder />
      </Card>
      <Footer />
    </Wrapper>
  );
}
