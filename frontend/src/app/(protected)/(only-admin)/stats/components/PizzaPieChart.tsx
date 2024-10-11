"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { getTop5SelledPizzas } from "@/lib/api/stats.service";
import { useAuth } from "@/context/auth-context";
import useSimpleQuery from "@/hooks/useSimpleQuery";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export default function PizzaPieChart() {
  const { token } = useAuth();

  const params = React.useMemo(
    () => ({ accessToken: token?.accessToken }),
    [token]
  );

  const { data, loading } = useSimpleQuery({
    fn: async (params) => {
      if (!params.accessToken) return Promise.resolve(undefined);

      return (await getTop5SelledPizzas(params.accessToken)).map(
        (pizza, i) => ({
          ...pizza,
          fill: `hsl(var(--chart-${i + 1}))`,
        })
      );
    },
    params,
  });

  const totalPizzas = React.useMemo(() => {
    return data ? data.reduce((acc, curr) => acc + curr.count, 0) : 0;
  }, [data]);

  if (!data || loading) {
    return (
      <Card className="flex flex-col basis-0">
        <CardHeader className="items-center pb-0">
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="flex flex-1 justify-center py-2">
          <Skeleton className="h-32 w-32 rounded-full" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="h-4 w-48" />
        </CardFooter>
      </Card>
    );
  }

  const chartConfig = {
    count: {
      label: "count",
    },
    ...data.reduce((acc, curr, index) => {
      acc[curr.name] = {
        label: curr.name,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as ChartConfig),
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 5 Pizzas más vendidas</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPizzas.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pizzas totales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>

            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando el top de pizzas más vendidas a lo largo del tiempo
        </div>
      </CardFooter>
    </Card>
  );
}
