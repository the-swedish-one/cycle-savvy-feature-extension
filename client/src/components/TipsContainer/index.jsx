import PropType from "prop-types";

import "./styles.css";

const TipsContainer = (props) => {
  const { selectedSymptom } = props;

  const { displayName } = TipsContainer;

  return (
    <div className="tipsContainer">
      {!selectedSymptom && (
        <div className="tipsContainer">
          <h5 className="initialText">
            If you wonder how you you can support yourself, <br />
            or your partner experiencing these symptoms, <br />
            simply pick a symptom on the left to see tips!
          </h5>
        </div>
      )}
      {selectedSymptom && (
        <h5 className="mainTipsHeader">{selectedSymptom["symptom_name"]}</h5>
      )}
      {selectedSymptom && (
        <div className="tipsSection">
          <h6 className="tipsHeader">Self-care tips</h6>
          <p className="tipsText">{selectedSymptom["self_care_tips"]}</p>
          <p className="tipsNote">
            Remember that these self-care tips can help manage symptoms, but if
            your symptoms are severe, persist for an extended period, or
            significantly impact your quality of life, it's essential to consult
            a healthcare professional for further evaluation and guidance.
          </p>
        </div>
      )}

      {selectedSymptom && (
        <div className="tipsSection">
          <h6 className="tipsHeader">Partner-support tips</h6>
          <p className="tipsText">{selectedSymptom["partner_support_tips"]}</p>
          <p className="tipsNote">
            These partner support tips aim to foster understanding, empathy, and
            active involvement in supporting a woman's well-being during her
            menstrual cycle. It's important to maintain open communication and
            adapt the level of support based on individual preferences and
            needs.
          </p>
        </div>
      )}
    </div>
  );
};

TipsContainer.displayName = "TipsContainer";

export default TipsContainer;
