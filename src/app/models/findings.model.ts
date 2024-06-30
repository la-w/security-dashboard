export class Finding {
  id!: number;
  location!: string;
  tool!: SarifTool;
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
  toolRule!: {name:string};
  rule!: string;
  isFalsePositive!: boolean;
  branch!: string;
  commitHash!: string;
  pipelineId!: number;
}

export class PipelineRun {
  pipelineId!: number;
  createdAt!: Date;
  branch!: string;
  commitHash!: string;
  repository!: { "name": string, "url": string };
}

export enum SarifTool {
  'FluidAttacks',
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
