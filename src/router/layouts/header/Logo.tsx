import { Link } from 'react-router';
import LogoImg from '../../../img/DundichTaighDigitalLogo.png';
import { CinematicTitle } from '../../../components/atoms';

const Logo = () => {
  return (
    <Link className="group flex items-center gap-2 sm:gap-3" to="/">
      <div
        className="h-15 w-15 rounded-full bg-cover bg-center transition duration-300 group-hover:shadow-lg group-hover:shadow-amber-800/25 sm:h-20 sm:w-20 md:h-25 md:w-25"
        style={{ backgroundImage: `url(${LogoImg})` }}
      ></div>
      <div className="hidden flex-col items-center sm:flex">
        <CinematicTitle text="DUNDICH'S" />
        <CinematicTitle text="TAIGH" />
      </div>
    </Link>
  );
};

export default Logo;
