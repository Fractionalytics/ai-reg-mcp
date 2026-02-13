/**
 * TypeScript interfaces for the AI regulatory data schema.
 * Matches the schema design in docs/product-strategy.md.
 */

export interface Applicability {
  who_it_applies_to: string[];
  definitions: Record<string, string>;
  scope_conditions: string;
  exemptions: string[];
  geographic_trigger: string;
}

export interface Obligation {
  obligation_id: string;
  law_id: string;
  applies_to: string;
  category: ObligationCategory;
  requirement_text: string;
  plain_language: string;
  deadline: string | null;
  recurring: boolean;
  frequency: string | null;
  citation: string;
}

export type ObligationCategory =
  | "risk_assessment"
  | "transparency"
  | "documentation"
  | "consumer_rights"
  | "bias_testing"
  | "human_oversight"
  | "incident_reporting"
  | "disclosure"
  | "governance"
  | "data_protection"
  | "other";

export interface Penalty {
  enforcing_body: string;
  private_right_of_action: boolean;
  penalty_range: string;
  cure_period: boolean;
  cure_period_days: number | null;
  notes: string;
}

export interface SafeHarbor {
  description: string;
  framework_reference: string;
  citation: string;
}

export interface CrossReference {
  related_law: string;
  relationship: string;
  category: string;
  notes: string;
}

export interface ChangeLogEntry {
  id?: number;
  law_id: string;
  date: string;
  change_type: "amendment" | "delay" | "guidance" | "enforcement_action" | "new_law";
  description: string;
}

export interface Law {
  law_id: string;
  jurisdiction: string;
  common_name: string;
  official_citation: string;
  status: "enacted" | "effective" | "proposed" | "amended";
  effective_date: string;
  last_updated: string;
  source_url: string;
  summary: string;
  applicability: Applicability;
  penalties: Penalty;
  safe_harbors: SafeHarbor[];
  cross_references: CrossReference[];
}

/** The full seed data shape for a single law JSON file. */
export interface LawSeedData {
  law: Law & {
    obligations: Omit<Obligation, "law_id">[];
    change_log: Omit<ChangeLogEntry, "id" | "law_id">[];
  };
}

// ----- Query parameter types -----

export interface SearchLawsParams {
  jurisdiction?: string;
  status?: string;
  effective_date_after?: string;
  effective_date_before?: string;
  applies_to?: string;
  category?: ObligationCategory;
  query?: string;
}

export interface GetObligationsParams {
  law_id?: string;
  jurisdiction?: string;
  applies_to?: string;
  category?: ObligationCategory;
}

export interface CompareJurisdictionsParams {
  jurisdictions: string[];
  category?: ObligationCategory;
  applies_to?: string;
}

export interface GetChangesParams {
  since?: string;
  until?: string;
  law_id?: string;
  change_type?: string;
}
