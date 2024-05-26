import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServisCard = ({ color, title, subtitle, icon }) => {
  return (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl max-w-[680px]">
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1 text-white">
        <h3 className="mt-2 text-lg">{title}</h3>
        <p className="mt-2 text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h2 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServisCard
          color="bg-[#2952E3]"
          title="Security"
          subtitle="Security is guaranted. We always maintain privacy and maintain the quality of our products."
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
        />
        <ServisCard
          color="bg-[#8945F8]"
          title="Best exhange rates"
          subtitle="Get the best exchange rates in the market. We always ensure that you get the best value for your money."
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
        />
        <ServisCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          subtitle="Enjoy fast transaction speeds. We use the latest technology to ensure that transactions are processed quickly and efficiently."
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
        />
      </div>
    </section>
  );
};

export default Services;
