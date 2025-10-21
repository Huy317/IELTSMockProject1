import { useState } from "react";
import { useNavigate } from "react-router-dom";


function BannerSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    
    let navigate = useNavigate();

    function handleSubmit(){
        console.log("Search submitted", searchTerm);

        // Build query params conditionally
        const params = new URLSearchParams();
        
        // Only add search term if it's not empty
        if (searchTerm && searchTerm.trim() !== '') {
            params.append('search', searchTerm.trim());
        }
        
        // Navigate with query string (or empty if no params)
        const queryString = params.toString();
        console.log("Navigating to:", `/test/list${queryString ? `?${queryString}` : ''}`);
        navigate(`/test/list${queryString ? `?${queryString}` : ''}`);
    }

    return (
        <div className="banner-search">
            <input
                type="text"
                name="search"
                className="border-0 form-control p-0"
                placeholder="Search for Courses, Instructors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary ms-auto" onClick={handleSubmit}>
                <i className="isax isax-arrow-right-1"></i>
            </button>
        </div>
    );
}
export default BannerSearch;