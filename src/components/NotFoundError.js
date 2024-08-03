import "../styles/errors.css";
import ErrorImg from "../images/404.webp";
function NotFoundError() {
  return (
    <div className="error-container">
      <div className="error">
        <p>4</p>
        <img className="error-img" src={ErrorImg} alt="error" />
        <p>4</p>
      </div>
      <p className="error-title">Pokemon Not Found</p>
    </div>
  );
}
export default NotFoundError;
