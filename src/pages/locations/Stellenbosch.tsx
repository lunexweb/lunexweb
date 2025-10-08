import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Stellenbosch = () => {
  return <LocationPage {...locationData["stellenbosch"]} />;
};

export default Stellenbosch;

