/**
 * HTTP client for the AI-Reg remote API.
 * Handles authentication, request building, and typed responses.
 */

import type {
  SearchLawsParams,
  GetObligationsParams,
  CompareJurisdictionsParams,
  GetChangesParams,
  Law,
  Obligation,
  ChangeLogEntry,
} from "./data/types.js";

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiResponse<T> {
  data: T;
  meta: { count: number; api_version: string };
}

interface ApiErrorResponse {
  error: { code: string; message: string; status: number };
}

export class AiRegApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  private async request<T>(path: string, params: Record<string, string | undefined> = {}): Promise<T[]> {
    const url = new URL(`${this.baseUrl}${path}`);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null) as ApiErrorResponse | null;
      const code = body?.error?.code || "API_ERROR";
      const message = body?.error?.message || `API returned ${response.status}`;
      throw new ApiError(code, message, response.status);
    }

    const body = (await response.json()) as ApiResponse<T[]>;
    return body.data;
  }

  async searchLaws(params: SearchLawsParams): Promise<Law[]> {
    return this.request<Law>("/api/v1/laws", {
      jurisdiction: params.jurisdiction,
      status: params.status,
      effective_date_after: params.effective_date_after,
      effective_date_before: params.effective_date_before,
      applies_to: params.applies_to,
      category: params.category,
      query: params.query,
    });
  }

  async getObligations(
    params: GetObligationsParams
  ): Promise<(Obligation & { law_common_name: string; jurisdiction: string })[]> {
    return this.request("/api/v1/obligations", {
      law_id: params.law_id,
      jurisdiction: params.jurisdiction,
      applies_to: params.applies_to,
      category: params.category,
    });
  }

  async compareJurisdictions(params: CompareJurisdictionsParams): Promise<unknown[]> {
    return this.request("/api/v1/compare", {
      jurisdictions: params.jurisdictions.join(","),
      category: params.category,
      applies_to: params.applies_to,
    });
  }

  async getChanges(
    params: GetChangesParams
  ): Promise<(ChangeLogEntry & { law_common_name: string; jurisdiction: string })[]> {
    return this.request("/api/v1/changes", {
      since: params.since,
      until: params.until,
      law_id: params.law_id,
      change_type: params.change_type,
    });
  }
}
