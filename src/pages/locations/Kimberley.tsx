import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Kimberley = () => {
  return <LocationPage {...locationData["kimberley"]} />;
};

export default Kimberley;



