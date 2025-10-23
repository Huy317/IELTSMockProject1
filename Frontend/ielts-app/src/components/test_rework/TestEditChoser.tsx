import { useParams } from "react-router-dom";
import EditListeningTest from "./EditListeningTest";
import EditReadingTest from "./EditReadingTest";
import { getTestById } from "../../services/testService";
import { useEffect, useState } from "react";
import { type TestWithAuthorName } from "../../types/Test";
import { toast } from "react-toastify";


function TestEditChoser() {

    const { id } = useParams();

    const [test, setTest] = useState<TestWithAuthorName | null>(null);

    const fetchTest = async () => {
        if (!id) return;
        const loadPromise = getTestById(id).then((data) => {
            setTest(data);
            return data;
        });

        toast.promise(loadPromise, {
            pending: "Loading test...",
            // success: "Test loaded",
            error: "Failed to load test details.",
        });
    };

    useEffect(() => {
        void fetchTest();
    }, [id]);

    return (
        <>
            {test && test.typeName === "Listening" && <EditListeningTest testPrefetch={test} />}
            {test && test.typeName === "Reading" && <EditReadingTest testPrefetch={test} />}
        </>
    );
}
export default TestEditChoser;