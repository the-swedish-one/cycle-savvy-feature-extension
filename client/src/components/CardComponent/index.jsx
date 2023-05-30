import PropType from "prop-types";

import "./styles.css";

const CardComponent = (props) => {
  const { children} = props;

  const { displayName } = CardComponent;

  return (
    <div className={displayName}>
      {children}
    </div>
  );
};

CardComponent.displayName = "CardComponent";

// CardComponent.propTypes = {
//   children: PropType.children,
// };

// CardComponent.defaultProps = {
//   children: "",
// };

export default CardComponent;
