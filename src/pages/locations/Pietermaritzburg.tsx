import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Pietermaritzburg = () => {
  return <LocationPage {...locationData["pietermaritzburg"]} />;
};

export default Pietermaritzburg;

