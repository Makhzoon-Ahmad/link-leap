"use client"

import { useEffect, } from "react"
import {  TrendingUp,  MousePointer } from "lucide-react"
import { Line, LineChart, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export default function AnalyticsDashboard() {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading, } = useQuery({
    queryKey: ["insights" ],
    queryFn: async () => {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BASE_URL}/api/v1/insights`,{
      headers: {
        "content-type": "application/json",
        ...(token && { authorization: token }),
      },
      });
      const data = await response.json();
      if (!("data" in data)) {
        throw new Error(data.message);
      }
      return data.data ?? null;
    },
  });
  useEffect( ()=>{
    if (data)
    {console.log(data)}
  },[data])
  
  if (isLoading)
  {
    return <div className="flex items-center justify-center h-screen text-white">
      Loading...
    </div>
  }

  if (!data)
  {
    return <div className="flex h-screen justify-center items-center">
      No Data found
    </div>
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <div className="ml-auto flex items-center space-x-4">
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2   mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Clicks
                </div>
              </CardTitle>
              <Button variant="ghost" size="sm">
                <TrendingUp className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data?.totalClicks?.clicks}</div>
            </CardContent>
          </Card>

        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={data?.hourlyClicks}>
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={"preserveStartEnd"}
                  // tickFormatter={(value) => {
                  //   const times = ["5:00 AM", "10:00 AM", "3:00 PM", "8:00 PM", "1:00 AM"]
                  //   return times.includes(value) ? value : ""
                  // }}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value"  stroke="var(--color-value)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Data Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="destination-urls" className="w-full">
                <div className="border-b">
                  <TabsList className="grid w-full grid-cols-2 h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="destination-urls"
                      className="text-center  w-full rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                    >
                     Links 
                    </TabsTrigger>
                    <TabsTrigger
                      value="countries"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                    >
                      Countries
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center justify-end px-4 py-2 text-xs text-muted-foreground">
                    <MousePointer className="mr-1 h-3 w-3" />
                    CLICKS
                  </div>
                </div>
                <TabsContent value="destination-urls" className="mt-0">
                  <div className="p-0">
                    {data?.links.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                      >
                        <div className="font-medium text-sm">{item.link}</div>
                        <div className="text-sm font-medium">{item.clicks}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="countries" className="mt-0">
                  <div className="p-0">
                    {data?.countries.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{item.flag}</span>
                          <span className="font-medium text-sm">{item.countries}</span>
                        </div>
                        {/* <div className="text-sm font-medium">{item.clicks.toLocaleString()}</div> */}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right Column */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="devices" className="w-full">
                <div className="border-b">
                  <TabsList className="grid w-full grid-cols-4 h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="devices"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                    >
                      Devices
                    </TabsTrigger>
                    <TabsTrigger
                      value="browsers"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                    >
                      Browsers
                    </TabsTrigger>
                    <TabsTrigger
                      value="os"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                    >
                      OS
                    </TabsTrigger>
                    <TabsTrigger
                      value="triggers"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                    >
                     UserAgent 
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center justify-end px-4 py-2 text-xs text-muted-foreground">
                    <MousePointer className="mr-1 h-3 w-3" />
                    CLICKS
                  </div>
                </div>
                <TabsContent value="devices" className="mt-0">
                  <div className="p-0">
                    {data?.devices?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                      >
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{item.total}</div>
                          <div className="text-xs text-muted-foreground">({item.clicks})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="browsers" className="mt-0">
                  <div className="p-0">
                    {data?.browsers.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                      >
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{item.total}</div>
                          <div className="text-xs text-muted-foreground">({item.clicks}%)</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="os" className="mt-0">
                  <div className="p-0">
                    {data?.operatingSystems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                      >
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{item.total}</div>
                          <div className="text-xs text-muted-foreground">({item.clicks})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="triggers" className="mt-0">
                  <div className="p-0">
                    {data?.userAgent.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-muted/50"
                      >
                        <div className="font-medium text-sm">{item.userAgent}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        
        </div>

        {/* Bottom Tables */}
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          {/* Technical Data */}
     
        </div>
      </div>

    
    </div>
  )
}
