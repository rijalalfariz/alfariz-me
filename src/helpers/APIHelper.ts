import { NextResponse } from "next/server";

const API_BASE_URL = process.env.PORTFOLIO_API_HOST || "https://portfolio-api-production-3d8f.up.railway.app/api/";
type Endpoint = "projects" | "users" | "experiences" | "jobs" | "academies" | "educations" | "skills";

export const getData = async (url: URL | string) => {
  try {
    const apiResponse = await fetch(url);
    if (!apiResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch data from API" }, { status: apiResponse.status });
    }
    const data = await apiResponse.json();
    return NextResponse.json(data);
  }
  catch (error ) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const getItemList = async (endpoint: Endpoint) => {
  const url = `${API_BASE_URL}${endpoint}/`;
  const response = await getData(url);
  return response;
};

