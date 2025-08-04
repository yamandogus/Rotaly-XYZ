"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with a custom label"

const chartData = [
  { ay: "Ocak", müşteri: 275, fill: "var(--color-chrome)" },
  { ay: "Şubat", müşteri: 200, fill: "var(--color-safari)" },
  { ay: "Mart", müşteri: 187, fill: "var(--color-firefox)" },
  { ay: "Nisan", müşteri: 173, fill: "var(--color-edge)" },
  { ay: "Mayıs", müşteri: 90, fill: "var(--color-other)" },
  { ay: "Haziran", müşteri: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  müşteri: {
    label: "Müşteri",
    color: "var(--chart-2)",
  },
  ocak: {
    label: "Ocak",
    color: "var(--chart-1)",
  },
  şubat: {
    label: "Şubat",
    color: "var(--chart-2)",
  },
  mart: {
    label: "Mart",
    color: "var(--chart-3)",
  },
  nisan: {
    label: "Nisan",
    color: "var(--chart-4)",
  },
  mayıs: {
    label: "Mayıs",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartLineLabelCustom() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Müşteri Sayısı</CardTitle>
        <CardDescription>Ocak - Haziran 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="ay"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="müşteri"
              type="natural"
              stroke="var(--color-müşteri)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-müşteri)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="ay"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-row items-start gap-2 text-sm justify-between h-full">
       <div>
       <div className="flex gap-2 leading-none font-medium">
          Müşteri sayısı 5.2% artış gösterdi <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Son 6 ay için toplam müşteri sayısı
        </div>
       </div>
       <div className="text-2xl font-bold">
        Toplam Müşteri Sayısı {chartData.reduce((acc, curr) => acc + curr.müşteri, 0)}
       </div>
      </CardFooter>
    </Card>
  )
}
