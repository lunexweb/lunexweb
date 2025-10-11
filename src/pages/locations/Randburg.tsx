import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

export default function Randburg() {
  const location = locationData["randburg"];
  
  return (
    <LocationPage
      province={location.province}
      city={location.city}
      population={location.population}
      description={location.description}
      majorIndustries={location.majorIndustries}
      localCompetitors={location.localCompetitors}
      testimonials={location.testimonials}
      stats={location.stats}
    />
  );
}
