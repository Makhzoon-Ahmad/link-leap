"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Filter, MoreHorizontal, TrendingUp, Users, MousePointer } from "lucide-react"
import { Line, LineChart, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"

const chartData = [
  { time: "5:00 AM", value: 12 },
  { time: "6:00 AM", value: 18 },
  { time: "7:00 AM", value: 35 },
  { time: "8:00 AM", value: 42 },
  { time: "9:00 AM", value: 68 },
  { time: "10:00 AM", value: 85 },
  { time: "11:00 AM", value: 92 },
  { time: "12:00 PM", value: 110 },
  { time: "1:00 PM", value: 125 },
  { time: "2:00 PM", value: 140 },
  { time: "3:00 PM", value: 155 },
  { time: "4:00 PM", value: 168 },
  { time: "5:00 PM", value: 145 },
  { time: "6:00 PM", value: 132 },
  { time: "7:00 PM", value: 118 },
  { time: "8:00 PM", value: 95 },
  { time: "9:00 PM", value: 78 },
  { time: "10:00 PM", value: 65 },
  { time: "11:00 PM", value: 45 },
  { time: "12:00 AM", value: 32 },
  { time: "1:00 AM", value: 28 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

const analyticsData = {
  countries: [
    { country: "United States", clicks: 3245, flag: "🇺🇸" },
    { country: "United Kingdom", clicks: 1892, flag: "🇬🇧" },
    { country: "Canada", clicks: 1247, flag: "🇨🇦" },
    { country: "Germany", clicks: 892, flag: "🇩🇪" },
    { country: "France", clicks: 654, flag: "🇫🇷" },
  ],
  cities: [
    { city: "New York", clicks: 1245 },
    { city: "London", clicks: 892 },
    { city: "Toronto", clicks: 654 },
    { city: "Berlin", clicks: 432 },
    { city: "Paris", clicks: 321 },
  ],
  regions: [
    { region: "California", clicks: 1500 },
    { region: "New York", clicks: 1200 },
    { region: "Texas", clicks: 900 },
    { region: "Florida", clicks: 700 },
    { region: "Illinois", clicks: 500 },
  ],
  continents: [
    { continent: "North America", clicks: 4500 },
    { continent: "Europe", clicks: 3000 },
    { continent: "Asia", clicks: 2000 },
    { continent: "Africa", clicks: 1000 },
    { continent: "South America", clicks: 800 },
  ],
  devices: [
    { device: "Desktop", clicks: 4521, percentage: 65.2 },
    { device: "Mobile", clicks: 2145, percentage: 30.9 },
    { device: "Tablet", clicks: 271, percentage: 3.9 },
  ],
  browsers: [
    { browser: "Chrome", clicks: 4892, percentage: 70.5 },
    { browser: "Safari", clicks: 1247, percentage: 18.0 },
    { browser: "Firefox", clicks: 542, percentage: 7.8 },
    { browser: "Edge", clicks: 256, percentage: 3.7 },
  ],
  os: [
    { os: "Windows", clicks: 3245, percentage: 46.8 },
    { os: "macOS", clicks: 2145, percentage: 30.9 },
    { os: "iOS", clicks: 892, percentage: 12.9 },
    { os: "Android", clicks: 654, percentage: 9.4 },
  ],
  triggers: [
    { trigger: "Button Click", clicks: 3000 },
    { trigger: "Form Submission", clicks: 2000 },
    { trigger: "Page View", clicks: 1500 },
    { trigger: "Video Play", clicks: 1000 },
    { trigger: "Download", clicks: 500 },
  ],
  shortLinks: [
    { url: "bit.ly/3xY9Kp2", clicks: 1247, destination: "example.com/product" },
    { url: "tinyurl.com/abc123", clicks: 892, destination: "mysite.com/landing" },
    { url: "short.link/xyz789", clicks: 654, destination: "store.com/sale" },
    { url: "bit.ly/summer2024", clicks: 432, destination: "events.com/summer" },
    { url: "t.co/AbC123XyZ", clicks: 321, destination: "blog.com/article" },
  ],
  destinationUrls: [
    { url: "example.com/product", clicks: 1247 },
    { url: "mysite.com/landing", clicks: 892 },
    { url: "store.com/sale", clicks: 654 },
    { url: "events.com/summer", clicks: 432 },
    { url: "blog.com/article", clicks: 321 },
  ],
  referrers: [
    { domain: "google.com", url: "google.com/search", clicks: 2145 },
    { domain: "facebook.com", url: "facebook.com/post/123", clicks: 1832 },
    { domain: "twitter.com", url: "twitter.com/user/tweet", clicks: 1247 },
    { domain: "linkedin.com", url: "linkedin.com/feed", clicks: 892 },
    { domain: "reddit.com", url: "reddit.com/r/technology", clicks: 654 },
  ],
  utmParameters: [
    { parameter: "utm_source=google", clicks: 2000 },
    { parameter: "utm_medium=cpc", clicks: 1500 },
    { parameter: "utm_campaign=summer_sale", clicks: 1000 },
    { parameter: "utm_term=running_shoes", clicks: 800 },
    { parameter: "utm_content=banner_ad", clicks: 500 },
  ],
}

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("Last 24 hours")

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading, error } = useQuery({
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
                      Triggers
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
