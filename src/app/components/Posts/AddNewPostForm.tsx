"use client";
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

interface Post {
  title: string;
  description: string;
  tags: string;
  postedByUserId?: string | null | undefined;
}
// type User =
//   | {
//       name?: string | null | undefined;
//       email?: string | null | undefined;
//       image?: string | null | undefined;
//       userId?: string | null | undefined;
//     }
//   | undefined;

type Props = {
  userSession: any;
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  tags: Yup.string().required("At least one tag is required").optional(),
});

interface Tags {
  id?: string;
  name?: string;
}
export default function AddNewPostForm({ userSession }: Props) {
  const [submissionStatus, setSubmissionStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [tagsList, setTagsList] = useState<Tags[]>([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data: Post) => {
      setLoading(true);
      const body = {
        description: data.description,
        postedByUserId: userSession?.user?.userId,
        tags: tagsList,
        title: data.title,
      };
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/create-post`;
        const response = await axios.post(url, body);
        formik.resetForm();
        setTagsList([]);
        setSubmissionStatus("Form submitted successfully!");
      } catch (error) {
        setSubmissionStatus("Failed to submit form");
      } finally {
        setLoading(false);
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

          <div className="flex w-full max-w-sm items-center space-x-2">
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
            <Button
              type="button"
              className=""
              onClick={() => {
                if (formik.values.tags.trim() === "") {
                  return;
                }
                setTagsList([
                  ...tagsList,
                  {
                    id: "id" + Math.random().toString(16).slice(2),
                    name: formik.values.tags,
                  },
                ]);
                formik.setFieldValue("tags", "");
              }}
            >
              add Tag
            </Button>
          </div>
          {formik.touched.tags && formik.errors.tags ? (
            <div className="shadcdn-error">{formik.errors.tags}</div>
          ) : null}
        </div>
        <div className="flex gap-2 flex-wrap my-3">
          {tagsList?.map((data: Tags, index: number) => {
            return (
              <div
                key={"tags_" + index}
                className={`${buttonVariants({
                  variant: "outline",
                })} p-10 pr-0 overflow-hidden`}
              >
                <div className="">{data.name}</div>
                <button
                  className="bg-red-600 text-white p-2"
                  type="button"
                  onClick={() => {
                    const updatedTags = tagsList.filter(
                      (tag) => tag.id !== data.id
                    );
                    setTagsList(updatedTags);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Submit
        </button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
}
