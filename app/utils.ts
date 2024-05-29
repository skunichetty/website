export function dateComparator(a: Date, b: Date, ascending: boolean) {
  let number = 0;
  if (a < b) {
    number = -1;
  } else if (a > b) {
    number = 1;
  }
  return ascending ? number : number * -1;
}
