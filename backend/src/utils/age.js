/**
 * Calculates age from a DOB string (YYYY-MM-DD).
 * Correctly handles the case where the birthday has not yet occurred this year.
 *
 * Returns a number (age in years).
 */
export function calculateAge(dobStr) {
  const dob = new Date(dobStr);
  const dobTime = dob.getTime();

  // Validation should prevent invalid dates, but guard anyway.
  if (Number.isNaN(dobTime)) return 0;

  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // If birthday has not occurred yet this year, subtract 1.
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}
