import AddNewPostForm from "../../components/Posts/AddNewPostForm";
export default async function NewPost() {
  return (
    <div className="w-[1280px] flex flex-col">
      <h1 className="text-3xl">Create New Post</h1>
      <AddNewPostForm />
    </div>
  );
}
