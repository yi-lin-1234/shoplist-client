import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { AuthContext } from "../App";

import {
  getUnpurchasedItems,
  markItemAsPurchased,
  deleteItemById,
} from "../apiService";
import Error from "./Error";
import { Item } from "../type";

function All() {
  const [items, setItems] = useState<Item[]>([]);

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const token = useContext(AuthContext);

  const navigate = useNavigate();

  const updateStatusById = async (id: string) => {
    try {
      await markItemAsPurchased(id, token);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItemById = async (id: string) => {
    try {
      await deleteItemById(id, token);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToEditItem = async (id: string) => {
    try {
      navigate(`/dashboard/edit/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getUnpurchasedItems(token);
        setItems(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [token]);

  if (error) return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-4 px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(item.createdAt), "yyyy-MM-dd")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button
                          className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                          onClick={() => updateStatusById(item.id)}
                        >
                          done
                        </button>
                        <button
                          className="ml-2 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                          onClick={() => navigateToEditItem(item.id)}
                        >
                          edit
                        </button>

                        <button
                          className="ml-2 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                          onClick={() => removeItemById(item.id)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default All;
