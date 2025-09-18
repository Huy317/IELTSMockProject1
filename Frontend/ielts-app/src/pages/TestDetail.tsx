import { useParams } from "react-router-dom";

function TestDetail() {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1>Test Detail Page</h1>
            <p>Test ID: {id}</p>
        </div>
    );
}

export default TestDetail;