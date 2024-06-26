export class Finding {
  id!: number;
  location!: string;
  tool!: SarifTool;
  ruleId!: string;
  description!: string;
  snippet!: string;
  snippetStartLine!: number;
  snippetStartColumn!: number;
  snippedEndLine?: number;
  snippedEndColumn?: number;
  level!: FailureLevel;
  cweIds!: string[];
  securityAdvisories!: string[];
  pipelineRunId!: number;
  toolRuleId!: string;
  falsePositive!: boolean;
  branch!: string;
  commitHash!: string;
  pipelineId!: number;
}

export interface FluidAttacksFinding extends Finding {
  cvss31Vector?: string;
  cvss40Vector?: string;
  kind: string;
  technique: string;
  sourceMethod: string;
}

export interface GitLeaksFinding extends Finding {
  commitHash: string;
  commitMessage: string;
  author: string;
  email: string;
  commitDate: Date;
}

export interface OwaspZapFinding extends Finding {
  attack: string;
  webRequest: string;
  webResponse: string;
}

export interface SemgrepFinding extends Finding { }

export interface TrivyFinding extends Finding { }

export interface OwaspDependencyCheckFinding extends Finding { }

export enum SarifTool {
  'FluidAttacks Scanner',
  'GitLeaks',
  'OWASP Dependency-Check',
  'Semgrep OSS',
  'Aqua Security Trivy',
  'OWASP ZAP',
}

export enum FailureLevel {
  'None',
  'Note',
  'Warning',
  'Error',
}
