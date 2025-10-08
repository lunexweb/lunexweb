import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Sandton = () => {
  return <LocationPage {...locationData["sandton"]} />;
};

export default Sandton;

