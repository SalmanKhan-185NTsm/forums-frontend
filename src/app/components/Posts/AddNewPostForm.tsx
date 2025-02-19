"use client";
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  tags: Yup.string().required("At least one tag is required"),
});

const AddNewPostForm: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        // const response = await axios.post("/api/submit", values);
        setSubmissionStatus("Form submitted successfully!");
      } catch (error) {
        setSubmissionStatus("Failed to submit form");
      }
    },
  });

  return (
    <div className="shadcdn-form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="shadcdn-form-group flex flex-col mb-2">
          <label htmlFor="title" className="text-2xl">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={
              formik.touched.title && formik.errors.title
                ? "shadcdn-input-error"
                : ""
            }
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="shadcdn-error">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="shadcdn-form-group mb-2">
          <label htmlFor="description" className="text-2xl">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={
              formik.touched.description && formik.errors.description
                ? "shadcdn-input-error"
                : ""
            }
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="shadcdn-error">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="shadcdn-form-group mb-2">
          <label htmlFor="tags" className="text-2xl">
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
            className={
              formik.touched.tags && formik.errors.tags
                ? "shadcdn-input-error"
                : ""
            }
          />
          {formik.touched.tags && formik.errors.tags ? (
            <div className="shadcdn-error">{formik.errors.tags}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Submit
        </button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default AddNewPostForm;
