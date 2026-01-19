import { FC } from "react";
import SiteBanner from "../../components/SiteBanner/SiteBanner";
import CatCardContainer from "../../components/CatCardContainer/CatCardContainer";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="pt-8 flex flex-col items-center justify-center gap-20">
      <SiteBanner />
      <CatCardContainer></CatCardContainer>
    </div>
  );
};

export default Home;
