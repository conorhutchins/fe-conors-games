import { Link, useParams } from 'react-router-dom';
import "../styles/navBar.css";


const Nav = () => {
    const { reviewId } = useParams();
    const defaultReviewId = reviewId || 1;
    return ( 
        <nav>
            <ul className="navBar">
                <li className="navList">
                    {""}
                    <Link to="/">Home</Link>
                </li>
                <li className="navList">
                    {""}
                    <Link to="/reviews">All Reviews</Link>
                </li>
                <li className="navList">
                    {""}
                    
                </li>
                <li className="navList">
                    {""}
                    <Link to="/form">Submit a Review Form</Link>
                </li>
            </ul>
        </nav>
     );
}
export default Nav;