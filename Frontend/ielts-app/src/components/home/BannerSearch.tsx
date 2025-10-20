import { useState } from "react";
import { useNavigate } from "react-router-dom";


function BannerSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Select Category');
    
    let navigate = useNavigate();

    function handleSubmit(){
        console.log("Search submitted", searchTerm, selectedCategory);

        // Build query params conditionally
        const params = new URLSearchParams();
        
        // Only add skillName if a valid category is selected
        if (selectedCategory && selectedCategory !== 'Select Category') {
            params.append('skillName', selectedCategory);
        }
        
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
            <div className="dropdown">
                <a className="hero-dropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedCategory}<i className="isax isax-arrow-down5 fs-12"></i>
                </a>
                <ul className="dropdown-menu p-1">
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('Select Category')}>Select Category</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('reading')}>Reading</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('listening')}>Listening</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('writing')}>Writing</a></li>
                </ul>
            </div>
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