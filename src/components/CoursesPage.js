import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
function CoursesPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Course naming collision, resolve with underscore
        getCourses().then((_courses) => setCourses(_courses));
    }, []); // Don't forget about dependency array or else the API will continually calls
    // Empty array means "run useEffect only one time"

    return (
        <>
            <h2> Courses </h2>
            <Link className="btn btn-primary" to="/course">
                Add Courses
            </Link>
            <CourseList courses={courses} />
        </>
    );
}

export default CoursesPage;
