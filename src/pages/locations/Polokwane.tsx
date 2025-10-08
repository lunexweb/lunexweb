import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Polokwane = () => {
  return <LocationPage {...locationData["polokwane"]} />;
};

export default Polokwane;



