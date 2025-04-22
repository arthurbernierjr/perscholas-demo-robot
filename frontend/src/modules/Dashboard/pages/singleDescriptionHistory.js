import { useEffect, useState } from "react";
//COMPONENTS
import Card from "../../common/components/Cards/Card";
import TextArea from "../../common/components/Inputs/TextAreaInput";
import Spinner from "../../common/components/Spinner/Spinner";
import fetchUserDescriptions from "../api/fetchUserSingleDescriptions";

const SingleDescriptionTextAreas = ({ descriptions }) => {
  if (descriptions.length) {
    return descriptions
      .map(({ description }, index) => {
        return (
          <div className="my-5">
            <TextArea
              label={`Description #${index + 1}`}
              value={description}
              key={index}
              rows={5}
            />
          </div>
        );
      })
      .reverse();
  }
};

const SingleProductDescription = () => {
  const [userDescriptions, setUserDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { allUserSingleDescriptions } = await fetchUserDescriptions();

      if (allUserSingleDescriptions && allUserSingleDescriptions.length) {
        setUserDescriptions(allUserSingleDescriptions);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Spinner text="Loading..." />;
  }
  return (
    <div>
      <div className="mx-4 overall-tools">
        <div className=" mb-4 ">
          <Card
            title="Single Product Description History"
            explanation="View previously generated descriptions."
          >
            <SingleDescriptionTextAreas descriptions={userDescriptions} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDescription;
