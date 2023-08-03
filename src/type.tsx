export type Item = {
  id: string;
  name: string;
  category: string;
  purchased: boolean;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type Body = {
  name: string;
  category: string;
};

export type GroupedDataObj = {
  category: string;
  count: number;
};

export type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
  }>;
};
