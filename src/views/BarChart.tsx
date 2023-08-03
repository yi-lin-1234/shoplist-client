import { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";

import { getItemCountByCategory } from "../apiService";
import { GroupedDataObj, ChartData } from "../type";
import Error from "./Error";
import { AuthContext } from "../App";

// eslint-disable-next-line
import "chart.js/auto";

function BarChart() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of items",
        data: [],
        backgroundColor: "#4F45E4",
        borderWidth: 2,
      },
    ],
  });
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = useContext(AuthContext);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const grouped_data: GroupedDataObj[] = await getItemCountByCategory(
          token
        );
        const labels = grouped_data.map((obj) => obj.category);
        const data = grouped_data.map((obj) => obj.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Number of items",
              data: data,
              backgroundColor: "#4F45E4",
              borderWidth: 2,
            },
          ],
        });
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
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shopping List Statistics
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
              <Bar
                data={chartData}
                options={{ responsive: true, indexAxis: "y" }}
              />
            </div>
            <p className="mt-4 text-base text-gray-500">
              This chart represents the distribution of items across different
              categories in your shopping list. Gain insights into the number of
              items in each category.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
