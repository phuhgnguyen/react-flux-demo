import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: "",
    });

    useEffect(() => {
        const slug = props.match.params.slug; // from the path `/courses/:slug`
        if (slug) {
            courseApi.getCourseBySlug(slug).then((_course) => {
                setCourse(_course);
            });
        }
        // props.match.params.slug should be watched by useEffect, hence the dependency array
    }, [props.match.params.slug]);

    function handleChange({ target }) {
        // {target} = event.target
        const updatedCourse = {
            ...course,
            [target.name]: target.value,
        };
        setCourse(updatedCourse);
    }

    function formIsValid() {
        const _errors = {};
        if (!course.title) _errors.title = "Title is Required";
        if (!course.authorId) _errors.authorId = "Author ID is Required";
        if (!course.category) _errors.category = "Category is Required";

        setErrors(_errors);

        //Form is valid if errors object has no properties
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        // Adding a then() since saveCourse is a promise
        courseApi.saveCourse(course).then(() => {
            // Manual redirect instead of <Redirect />
            props.history.push("/courses");
            toast.success("Course saved.");
        });
    }
    return (
        <>
            <h2>Manage Course</h2>
            <CourseForm
                errors={errors}
                course={course}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ManageCoursePage;
