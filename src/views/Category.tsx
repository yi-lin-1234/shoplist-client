import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";

import { getPurchasedItems, getItemCountByCategory } from "../apiService";
import { GroupedDataObj, Item } from "../type";
import Error from "./Error";
import { AuthContext } from "../App";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Category() {
  const [items, setItems] = useState<Item[]>([]);
  const [groupedData, setGroupedData] = useState<GroupedDataObj[]>([]);
  const [currentTab, setCurrentTab] = useState("");

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = useContext(AuthContext);

  const navigation = groupedData.map((item) => ({
    name: item.category,
    count: item.count,
    current: currentTab === item.category,
  }));

  const filteredItems = items.filter((item) => item.category === currentTab);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getPurchasedItems(token);
        setItems(data);
        const categoryAndCount = await getItemCountByCategory(token);
        setGroupedData(categoryAndCount);
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
    <div className="flex min-h-full flex-col m-10">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <nav className="flex flex-1 flex-col py-8" aria-label="Sidebar">
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name} onClick={() => setCurrentTab(item.name)}>
                  <div
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold"
                    )}
                  >
                    {item.name}

                    <span
                      className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1">
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
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Purchased At
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredItems.map((item) => (
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
                              {format(new Date(item.updatedAt), "yyyy-MM-dd")}
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
        </main>
      </div>
    </div>
  );
}

export default Category;
