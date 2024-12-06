export const calculateRecommendedPercentage = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return 0;
  }        
  const totalItems = data.length;
  const recommendedCount = data.filter(item => item.isRecommended).length;

  const percentage = (recommendedCount / totalItems) * 100;
  return percentage.toFixed(2); // returns the percentage rounded to 2 decimal places
}