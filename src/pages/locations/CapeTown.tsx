import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const CapeTown = () => {
  return <LocationPage {...locationData["cape-town"]} />;
};

export default CapeTown;

