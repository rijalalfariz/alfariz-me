import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const API_KEY = process.env.METABASE_API_KEY;
  const host = "http://127.0.0.1:3000";

  interface QuestionFormData {
    id: number;
    filterYear?: string;
    filterGender?: string;
  }

  const fd = Object.fromEntries(await req.formData()) as unknown;
  const { id, filterYear = "", filterGender = "" } = fd as QuestionFormData;

  // First, get the saved question
  const questionResponse = await fetch(`${host}/api/card/${id}`, {
    headers: {
      "X-API-KEY": API_KEY || "",
    },
  });

  const question = await questionResponse.json();

  // Clone the dataset_query
  const modifiedQuery = JSON.parse(JSON.stringify(question.dataset_query));

  // Build filters
  const filters = [];

  // Add year filter
  if (filterYear) {
    // For binned years, filter within the range
    filters.push([
      "between",
      ["field", 23402, { "base-type": "type/Integer" }],
      parseInt(filterYear),
      parseInt(filterYear) + 1  // Since your data is binned by 2 years
    ]);
  }

  // Add gender filter
  if (filterGender) {
    filters.push([
      "=",
      ["field", 24565, { "base-type": "type/Text" }],
      filterGender
    ]);
  }

  // Apply filters to the query
  if (filters.length > 0) {
    // If there's an existing filter, combine with AND
    if (modifiedQuery.query?.filter) {
      modifiedQuery.query.filter = ["and", modifiedQuery.query.filter, ...filters];
    } else {
      // Otherwise, create new filter
      modifiedQuery.query.filter = filters.length === 1
        ? filters[0]
        : ["and", ...filters];
    }
  }

  // Execute the modified query using the dataset endpoint
  const queryResponse = await fetch(`${host}/api/dataset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY || "",
    },
    body: JSON.stringify({
      database: question.database_id,
      ...modifiedQuery
    }),
  });

  return NextResponse.json(await queryResponse.json());
}