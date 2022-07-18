export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

//RegEx Check
export const questionValidator = (question: string) =>
  question
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
