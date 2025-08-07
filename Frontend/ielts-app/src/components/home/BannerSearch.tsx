import { useState } from "react";


function BannerSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Select Category');
    function handleSubmit(){
        console.log("Search submitted", searchTerm, selectedCategory);
    }

    return (
        <div className="banner-search">
            <div className="dropdown">
                <a className="hero-dropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedCategory}<i className="isax isax-arrow-down5 fs-12"></i>
                </a>
                <ul className="dropdown-menu p-1">
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('Select Category')}>Select Category</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('2024')}>2024</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('2023')}>2023</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setSelectedCategory('2022')}>2022</a></li>
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