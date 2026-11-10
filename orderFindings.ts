export type ReviewFinding = {
  rule_id: string;
  severity: 'info' | 'warning' | 'error';
  record_ids: readonly string[];
  message: string;
};

const severityRank = { error: 0, warning: 1, info: 2 };

export function compareText(left: string, right: string): number {
  if (left < right) return -1;
  return left > right ? 1 : 0;
}

export function orderFindings(
  findings: readonly ReviewFinding[],
): ReviewFinding[] {
  return findings
    .map((finding) => ({
      ...finding,
      record_ids: [...finding.record_ids].sort(),
    }))
    .sort(
      (left, right) =>
        severityRank[left.severity] - severityRank[right.severity] ||
        compareText(left.rule_id, right.rule_id) ||
        compareText(left.record_ids.join(','), right.record_ids.join(',')),
    );
}
