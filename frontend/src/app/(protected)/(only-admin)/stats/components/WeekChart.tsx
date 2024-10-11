"use client";
import { useMemo } from "react";
import {
  Bar,
  Rectangle,
  XAxis,
  ReferenceLine,
  Label,
  BarChart,
  YAxis,
} from "recharts";

import { useAuth } from "@/context/auth-context";
import useSimpleQuery from "@/hooks/useSimpleQuery";
import { getNumberOfOrdersLastWeek } from "@/lib/api/stats.service";
import { getUtcDate } from "@/lib/date";
import { round } from "@/lib/numbers";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeekChart() {
  const { token } = useAuth();

  const params = useMemo(() => ({ accessToken: token?.accessToken }), [token]);

  const { data, loading } = useSimpleQuery({
    fn: async (params) => {
      if (!params.accessToken) return Promise.resolve(undefined);

      const data = await getNumberOfOrdersLastWeek(params.accessToken);
      const todayOrder = data.orders.pop() || { orders: 0, date: "" };
      return [data, todayOrder] as const;
    },
    params,
  });

  if (!data || loading) {
    return  <Card className="basis-1/3" x-chunk="charts-01-chunk-0">
    <CardHeader className="space-y-0 pb-2">
      <Skeleton className="h-6 w-32" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-64 w-full" />
    </CardContent>
    <CardFooter className="flex-col gap-2 text-sm">
      <Skeleton className="h-4 w-48" />
    </CardFooter>
  </Card>
  }

  const [dataOrders, todayOrder] = data;
  const averageOrders =
    dataOrders.orders.reduce((acc, { orders }) => acc + orders, 0) /
    dataOrders.orders.length;

  return (
    <Card className="basis-1/3" x-chunk="charts-01-chunk-0">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Hoy</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {todayOrder.orders}{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            ordenes
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            steps: {
              label: "Steps",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={dataOrders.orders}
          >
            <Bar
              dataKey="orders"
              fill="var(--color-steps)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <ReferenceLine
              y={averageOrders}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Órdenes promedio"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={round(averageOrders, 2)}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) =>
                getUtcDate(value).toLocaleDateString("es-ES", {
                  weekday: "short",
                })
              }
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={4} />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) =>
                    getUtcDate(value).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={1200}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Steps"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value="12,343"
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          En los últimos 7 días y hoy, se han hecho{" "}
          <span className="font-medium text-foreground">
            {dataOrders.total}
          </span>{" "}
          ordenes.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
