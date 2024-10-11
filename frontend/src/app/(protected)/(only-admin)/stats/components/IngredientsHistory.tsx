"use client";
import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { getIngredients } from "@/lib/api/ingredients.service";
import { useAuth } from "@/context/auth-context";
import useSimpleQuery from "@/hooks/useSimpleQuery";
import { getIngredientStockHistory } from "@/lib/api/stats.service";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  stock: {
    label: "Stock",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function IngredientsHistory() {
  const { token } = useAuth();

  const [ingredientId, setIngredientId] = React.useState<string | null>(null);

  const params = React.useMemo(
    () => ({ accessToken: token?.accessToken, ingredientId }),
    [token, ingredientId]
  );

  const { data: ingredients, loading: loadingIngredients } = useSimpleQuery({
    fn: getIngredients,
  });

  const { data, loading } = useSimpleQuery({
    fn: async (params) => {
      if (!params.accessToken) return Promise.resolve(undefined);

      return params.ingredientId
        ? getIngredientStockHistory(params.ingredientId, params.accessToken)
        : [];
    },
    params,
  });

  function calculatePercentageChange(data: { stock: number }[]) {
    if (data.length < 2) return null;

    const firstStock = data[0].stock;
    const lastStock = data[data.length - 1].stock;

    const percentageChange = ((lastStock - firstStock) / firstStock) * 100;
    return percentageChange;
  }
  const percentageChange = data ? calculatePercentageChange(data) : null;

  if (!data || !ingredients || loadingIngredients) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="h-4 w-48" />
        </CardFooter>
      </Card>
    );  
  }

  const unit = data[0]?.unit ?? "g";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uso de de los ingredientes a lo largo del tiempo</CardTitle>
        <CardDescription>Desde hace 30 días</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setIngredientId} value={ingredientId ?? ""}>
          <SelectTrigger className="mb-2">
            <SelectValue placeholder="Escoje un ingrediente para visualizarlo" />
          </SelectTrigger>
          <SelectContent>
            {ingredients.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(date) => {
                const utcDate = new Date(date).toUTCString().split(" ");

                return utcDate[1] + " " + utcDate[2];
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(label, payload) => {
                    const date = new Date(payload[0].payload.date);

                    const difference = date.getTimezoneOffset();
                    const newDate = new Date(
                      date.getTime() + difference * 60000
                    );

                    return (
                      <div>
                        {newDate.toLocaleDateString("es-ES", {
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    );
                  }}
                />
              }
            />
            <Line
              dataKey="stock"
              type="natural"
              stroke="var(--color-stock)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-stock)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(label: any) => `${label} ${unit}`}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {percentageChange !== null && (
          <div className="flex gap-2 font-medium leading-none">
            {percentageChange > 0 ? (
              <>
                El uso ha subido un {percentageChange.toFixed(2)}% este mes{" "}
                <TrendingUp className="h-4 w-4" />
              </>
            ) : (
              <>
                El uso ha bajado un {Math.abs(percentageChange).toFixed(2)}%
                este mes <TrendingDown className="h-4 w-4" />
              </>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
