import { useState, useEffect, FormEvent, useContext } from "react";
import { updateItemById, getItemById } from "../apiService";
import { useParams } from "react-router-dom";

import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import { AuthContext } from "../App";

function Edit() {
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const token = useContext(AuthContext);

  useEffect(() => {
    async function initialSetUp() {
      if (!id) {
        console.log("No ID provided");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getItemById(id, token);
        setName(data.name);
        setCategory(data.category);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [token, id]);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    if (!id) {
      console.log("No ID provided");
      return;
    }

    // Validate text input fields (should not be just spaces)
    if (!name.trim() || !category.trim()) {
      alert("Name or category cannot be empty or consist of only spaces.");
      return;
    }

    // Initialize request body
    const body = {
      name: name,
      category: category,
    };

    try {
      await updateItemById(id, body, token);
      setSuccess(true);
      setError(null);
    } catch (error: any) {
      console.error(error);
      setSuccess(false);
      setError(error);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-background-grey py-10 px-5 h-screen">
      <form
        className="mx-auto max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        onSubmit={handleOnSubmit}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  type="text"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2.5">
                <input
                  id="category"
                  type="text"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          {error && <ErrorAlert error={error} />}
          {success && <SuccessAlert message="new task create successfully!" />}
          <button
            type="submit"
            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
