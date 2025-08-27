/**
 * Formats a date string or Date object for displaying role registered dates.
 * Returns a string in the format: 'YYYY-MM-DD HH:mm:ss'
 * If the input is invalid or falsy, returns an empty string.
 */
export function formatRoleDate(date: string | Date | undefined | null): string {
  if (!date) return '';
  let d: Date;
  if (typeof date === 'string' || typeof date === 'number') {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
  } else {
    return '';
  }
  if (isNaN(d.getTime())) return '';

  const pad = (n: number) => n.toString().padStart(2, '0');
  const monthsShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const day = pad(d.getDate());
  const month = monthsShort[d.getMonth()];
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}
