export default function formatMoneyAsNumbers(moneyString: string): number {
  return Number(moneyString.replace(/[^0-9.-]+/g, ""));
}
