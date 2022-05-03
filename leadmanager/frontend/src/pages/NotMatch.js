import { useLocation } from "react-router-dom"

const NotMatch = () => {
    return (
        <>
            <h3>404 error</h3>
            <p>Page {useLocation().pathname} doesn't exist</p>
        </>
    )
};

export default NotMatch;