export const calculateResults = (marks) => {
  const { m1, m2, m3, m4, m5 } = marks;
  const total = parseInt(m1) + parseInt(m2) + parseInt(m3) + parseInt(m4) + parseInt(m5);
  const percentage = (total / 5).toFixed(1);
  
  let division;
  if (percentage >= 80) division = 'First Division';
  else if (percentage >= 60) division = 'Second Division';
  else if (percentage >= 40) division = 'Third Division';
  else division = 'Fail';
  
  return { percentage, division };
};