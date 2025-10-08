import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Pretoria = () => {
  return <LocationPage {...locationData["pretoria"]} />;
};

export default Pretoria;

