"use client";
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

// interface Comment {
//   comment: string;
//   postedByUserId?: string | null | undefined;
// }

type Props = {
  userSession: any;
  postData: any;
  refreshData: any;
};

const validationSchema = Yup.object({
  comment: Yup.string().required("Comment is required").max(750),
});

export default function AddComment({
  userSession,
  postData,
  refreshData,
}: Props) {
  const [submissionStatus, setSubmissionStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data: any) => {
      try {
        setLoading(true);
        const body = {
          userId: userSession?.user?.userId,
          postId: postData?.postId,
          content: data.comment,
        };
        const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/new-comment`;
        const response = await axios.post(url, body);
        formik.resetForm();
        refreshData();
        setSubmissionStatus("Comment added successfully!");
      } catch (error) {
        console.error(error);
        setSubmissionStatus("Failed to save comment");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="shadcdn-form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="shadcdn-form-group mb-2">
          <textarea
            id="comment"
            name="comment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
            className={
              formik.touched.comment && formik.errors.comment
                ? "shadcdn-input-error"
                : ""
            }
          />
          {formik.touched.comment && formik.errors.comment ? (
            <div className="shadcdn-error">
              {typeof formik.errors.comment === "string"
                ? formik.errors.comment
                : ""}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Add comment
        </button>
      </form>
      <div className="my-2">
        {submissionStatus && <p>{submissionStatus}</p>}
      </div>
    </div>
  );
}
