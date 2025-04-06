import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
{/* add padding in x */}
      <section id="features" className="py-16 md:py-20 lg:py-28 lg:px-40">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="There are many futures available in our application. You can use them to make your life easier"
            center
          />
{/* add large device column grid from 3 to 2 */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-2">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
