import { http, HttpResponse } from "msw";
import {
  exampleEmployees,
  exampleCertificates,
  exampleRequests,
  exampleRoadmaps,
} from "@/utils/example-data";

export const handlers = [
  // Auth login handler
  http.post("*/api/Auth*", async ({ request }) => {
    let email = "admin@example.com";
    try {
      const body = (await request.json()) as any;
      if (body?.email) email = body.email;
    } catch {
      // empty body or text
    }

    return HttpResponse.json({
      statusCode: 200,
      data: {
        userID: "1",
        refreshToken: "offline-mock-refresh-token",
        jwt: "offline-mock-jwt-token",
        email: email,
        name: "Admin User",
      },
      message: "Successfully logged in via MSW mock worker",
    });
  }),

  // Get Users / Employees handler
  http.get("*/api/User*", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const searchEmail = url.searchParams.get("email") || "";

    const formattedEmployees = exampleEmployees.map((emp, index) => {
      const name = emp[0];
      const email =
        name.toLowerCase().replace(/\s+/g, ".") + "@company.com";
      return {
        user_id: (index + 1).toString(),
        name: name,
        email: email,
        phoneNumber: emp[1],
        position: emp[2],
        dateOfEmployment: emp[3],
        roles: [emp[2]],
        entity_Status: "Active",
      };
    });

    let filtered = formattedEmployees;
    if (searchEmail.trim()) {
      const q = searchEmail.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    const startIndex = (page - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    return HttpResponse.json({
      statusCode: 200,
      data: {
        total: filtered.length,
        data: paginated,
      },
    });
  }),

  // Create User
  http.post("*/api/User*", async ({ request }) => {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // ignore
    }

    return HttpResponse.json({
      statusCode: 200,
      data: {
        user_id: (exampleEmployees.length + 1).toString(),
        email: body.email || "newuser@company.com",
        status: "Created",
      },
      message: "User created successfully",
    });
  }),

  // Certificates mock
  http.get("*/api/Certificates*", () => {
    return HttpResponse.json({
      statusCode: 200,
      data: {
        total: exampleCertificates.length,
        data: exampleCertificates,
      },
    });
  }),

  // Requests mock
  http.get("*/api/Requests*", () => {
    return HttpResponse.json({
      statusCode: 200,
      data: {
        total: exampleRequests.length,
        data: exampleRequests,
      },
    });
  }),

  // Roadmaps mock
  http.get("*/api/Roadmaps*", () => {
    return HttpResponse.json({
      statusCode: 200,
      data: {
        total: exampleRoadmaps.length,
        data: exampleRoadmaps,
      },
    });
  }),
];
