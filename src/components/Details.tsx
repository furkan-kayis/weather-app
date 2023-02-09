import Footer from './Details/Footer';
import ForecastList from './Details/ForecastList';
import Highlights from './Details/Highlights';
import UnitSwitcher from './Details/UnitSwitcher';

export default function Details() {
  return (
    <div className="mx-auto max-w-max">
      <UnitSwitcher />
      <ForecastList />
      <Highlights />
      <Footer />
    </div>
  );
}
