import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Paarl = () => {
  return <LocationPage {...locationData["paarl"]} />;
};

export default Paarl;

