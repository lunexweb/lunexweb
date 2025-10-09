import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const EastLondon = () => {
  return <LocationPage {...locationData["east-london"]} />;
};

export default EastLondon;





